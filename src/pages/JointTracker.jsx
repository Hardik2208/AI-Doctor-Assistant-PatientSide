import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Button } from "../assets/component/button";

const JointTracker = ({ pose, onEndPractice }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [feedback, setFeedback] = useState("Getting ready...");
  const [duration, setDuration] = useState(0);
  const [reps, setReps] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(true);
  let poseLandmarker;
  let timerInterval = useRef(null);
  let repCounted = useRef(false);

  // Utility function to calculate the angle between three landmarks
  const getAngle = (A, B, C) => {
    const angle =
      Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
    let degrees = Math.abs((angle * 180.0) / Math.PI);
    if (degrees > 180.0) {
      degrees = 360.0 - degrees;
    }
    return degrees;
  };

  const analyzePose = (landmarks) => {
    // This is the key fix: only run the effect if the pose prop is a valid object
    if (!pose || !pose.title || !landmarks || landmarks.length < 33) {
      return; // Exit the function if the pose data is not ready
    }

    // A helper function to check if a pose is in a starting position
    const isStartingPosition = (landmarks) => {
      // Check if hands are near hips and body is relatively straight
      const wristToHipDistance = Math.abs(landmarks[15].y - landmarks[23].y);
      return wristToHipDistance < 0.2; // A threshold for a straight posture
    };

    switch (pose.title) {
      case "Tree Pose":
        // Left leg is standing leg, right leg is lifted
        const leftKneeStraightness = getAngle(
          landmarks[23],
          landmarks[25],
          landmarks[27]
        );
        const rightHipRotation = getAngle(
          landmarks[24],
          landmarks[23],
          landmarks[25]
        );

        if (leftKneeStraightness < 170) {
          setFeedback("Straighten your standing leg.");
        } else if (rightHipRotation < 45) {
          setFeedback("Open your hip to the side.");
        } else if (landmarks[28].y < landmarks[23].y) {
          setFeedback("Place your foot higher on your inner thigh.");
        } else {
          setFeedback("Excellent balance! Hold the pose.");
        }
        break;

      case "Child's Pose":
        const hipAngleLeft = getAngle(
          landmarks[11],
          landmarks[23],
          landmarks[25]
        );
        const hipAngleRight = getAngle(
          landmarks[12],
          landmarks[24],
          landmarks[26]
        );

        if (hipAngleLeft > 90 || hipAngleRight > 90) {
          setFeedback("Fold your hips back and rest.");
        } else if (landmarks[0].y < landmarks[24].y) {
          setFeedback("Relax your head towards the floor.");
        } else {
          setFeedback("Perfect. Hold the pose and breathe.");
        }
        break;

      case "Cobra Pose":
        const hipToShoulderAngle = getAngle(
          landmarks[12],
          landmarks[14],
          landmarks[16]
        );

        if (hipToShoulderAngle < 150) {
          setFeedback("Lift your chest higher and gently arch your back.");
        } else if (landmarks[23].y > landmarks[11].y) {
          setFeedback("Keep your hips down on the floor.");
        } else {
          setFeedback("Great form! Keep your shoulders down.");
        }
        break;

      case "Mountain Pose":
        const bodyStraightness = getAngle(
          landmarks[23],
          landmarks[25],
          landmarks[27]
        );
        const shoulderWidth = Math.abs(landmarks[11].x - landmarks[12].x);
        const hipWidth = Math.abs(landmarks[23].x - landmarks[24].x);

        if (bodyStraightness < 170) {
          setFeedback("Stand straight and tall.");
        } else if (Math.abs(shoulderWidth - hipWidth) > 0.1) {
          setFeedback("Keep your feet hip-width apart.");
        } else {
          setFeedback("Perfect. Stand grounded like a mountain.");
        }
        break;

      case "Downward Dog":
        const hipShoulderAngleLeft = getAngle(
          landmarks[11],
          landmarks[13],
          landmarks[25]
        );
        const hipShoulderAngleRight = getAngle(
          landmarks[12],
          landmarks[14],
          landmarks[26]
        );

        if (hipShoulderAngleLeft < 120 || hipShoulderAngleRight < 120) {
          setFeedback("Push your hips up higher to form a deeper V.");
        } else if (
          landmarks[11].y > landmarks[15].y ||
          landmarks[12].y > landmarks[16].y
        ) {
          setFeedback("Straighten your back. Push through your hands.");
        } else {
          setFeedback("Good form! You are in an inverted V.");
        }
        break;

      case "Warrior I":
        const frontKneeAngle = getAngle(
          landmarks[24],
          landmarks[26],
          landmarks[28]
        );
        const backLegStraightness = getAngle(
          landmarks[23],
          landmarks[25],
          landmarks[27]
        );

        if (frontKneeAngle > 160) {
          setFeedback("Bend your front knee to 90 degrees.");
        } else if (backLegStraightness < 170) {
          setFeedback("Straighten your back leg.");
        } else {
          setFeedback("You're a warrior! Hold the pose.");
        }
        break;

      case "Push-ups":
        const leftElbowAngle = getAngle(
          landmarks[11],
          landmarks[13],
          landmarks[15]
        );
        const rightElbowAngle = getAngle(
          landmarks[12],
          landmarks[14],
          landmarks[16]
        );

        if (
          (leftElbowAngle < 90 || rightElbowAngle < 90) &&
          !repCounted.current
        ) {
          setReps((prevReps) => prevReps + 1);
          repCounted.current = true;
          setFeedback("Good form! That's one rep.");
        } else if (
          leftElbowAngle > 160 &&
          rightElbowAngle > 160 &&
          repCounted.current
        ) {
          repCounted.current = false;
          setFeedback("Back to starting position.");
        } else {
          setFeedback("Keep your back straight and lower your body.");
        }
        break;

      case "Squats":
        const leftKneeSquat = getAngle(
          landmarks[23],
          landmarks[25],
          landmarks[27]
        );
        const rightKneeSquat = getAngle(
          landmarks[24],
          landmarks[26],
          landmarks[28]
        );

        if (leftKneeSquat < 90 && rightKneeSquat < 90 && !repCounted.current) {
          setReps((prevReps) => prevReps + 1);
          repCounted.current = true;
          setFeedback("Deep squat, excellent!");
        } else if (
          leftKneeSquat > 160 &&
          rightKneeSquat > 160 &&
          repCounted.current
        ) {
          repCounted.current = false;
          setFeedback("Back to standing. Great rep.");
        } else {
          setFeedback("Lower your hips, keep your back straight.");
        }
        break;

      case "Deadlifts":
        const leftBackAngle = getAngle(
          landmarks[11],
          landmarks[23],
          landmarks[25]
        ); // Shoulder, Hip, Knee
        const rightBackAngle = getAngle(
          landmarks[12],
          landmarks[24],
          landmarks[26]
        );

        if (leftBackAngle > 100 || rightBackAngle > 100) {
          setFeedback("Hinge at your hips and keep your back straight.");
        } else {
          setFeedback("Good form! Lift with your legs.");
        }
        break;

      case "Pull-ups":
        const shoulderToHandDistance = Math.abs(
          landmarks[11].y - landmarks[15].y
        );

        if (shoulderToHandDistance < 0.15 && !repCounted.current) {
          setReps((prevReps) => prevReps + 1);
          repCounted.current = true;
          setFeedback("Up and hold. Good rep.");
        } else if (shoulderToHandDistance > 0.3 && repCounted.current) {
          repCounted.current = false;
          setFeedback("Fully extend your arms.");
        } else {
          setFeedback("Pull yourself up until your chin is over the bar.");
        }
        break;

      case "Bench Press":
        const leftWristShoulderDistance = Math.abs(
          landmarks[15].x - landmarks[11].x
        );

        if (leftWristShoulderDistance > 0.2) {
          setFeedback("Keep your arms in line with your shoulders.");
        } else {
          setFeedback("Good form. Press the weight up.");
        }
        break;

      case "Plank":
        const shoulderToAnkleAngle = getAngle(
          landmarks[11],
          landmarks[23],
          landmarks[27]
        );

        if (shoulderToAnkleAngle < 160) {
          setFeedback("Keep your body in a straight line. Squeeze your core.");
        } else {
          setFeedback("Perfect plank! Hold it steady.");
        }
        break;

      default:
        setFeedback("Pose not recognized. Follow the instructions.");
        break;
    }
  };

  useEffect(() => {
    // This is the key fix: only run the effect if the pose prop is a valid object
    if (!pose) return;

    if (isSessionActive) {
      timerInterval.current = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval.current);
    }

    const createPoseLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });

      if (webcamRef.current) {
        webcamRef.current.video.addEventListener("loadeddata", () => {
          window.requestAnimationFrame(predictWebcam);
        });
      }
    };

    const predictWebcam = () => {
      if (!webcamRef.current || !webcamRef.current.video) {
        window.requestAnimationFrame(predictWebcam);
        return;
      }

      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");

      if (video && poseLandmarker) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const poseLandmarkerResult = poseLandmarker.detectForVideo(
          video,
          performance.now()
        );
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        if (poseLandmarkerResult.landmarks) {
          for (const landmarks of poseLandmarkerResult.landmarks) {
            drawConnectors(
              canvasCtx,
              landmarks,
              PoseLandmarker.POSE_CONNECTIONS,
              { color: "#00FF00", lineWidth: 4 }
            );
            drawLandmarks(canvasCtx, landmarks, {
              color: "#FF0000",
              lineWidth: 2,
            });
            analyzePose(landmarks);
          }
        }
      }
      window.requestAnimationFrame(predictWebcam);
    };

    createPoseLandmarker();

    return () => {
      clearInterval(timerInterval.current);
      if (poseLandmarker) {
        poseLandmarker.close();
      }
    };
  }, [pose]); // The dependency array now correctly uses the pose object

  const handleEndPracticeClick = () => {
    setIsSessionActive(false);

    const sessionData = {
      exercise: pose?.title,
      sessionDuration: duration,
      averageScore: 92,
      reps: reps,
      summary: "Workout completed.",
    };

    onEndPractice(sessionData);
  };

  if (!pose) {
    return <div>Loading pose data...</div>;
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <Webcam ref={webcamRef} className="w-full h-full absolute" />
      <canvas ref={canvasRef} className="w-full h-full absolute" />
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md">
        <p className="text-gray-800">{feedback}</p>
      </div>
      <div className="absolute top-4 right-4">
        <button
          onClick={handleEndPracticeClick}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          End Practice
        </button>
      </div>
    </div>
  );
};

export default JointTracker;
