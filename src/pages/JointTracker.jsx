import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Button } from "../assets/component/button";

const JointTracker = ({ pose, onEndPractice }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [feedback, setFeedback] = useState("Getting ready...");
  const [duration, setDuration] = useState(0); // State for the session timer
  const [reps, setReps] = useState(0); // State for repetition counter
  const [isSessionActive, setIsSessionActive] = useState(true);
  let poseLandmarker;
  let timerInterval = useRef(null);
  let repCounted = useRef(false); // To prevent double counting reps

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

  // Core logic to analyze the pose
  const analyzePose = (landmarks) => {
    if (!landmarks || landmarks.length < 33) return; // Ensure all landmarks are available

    // Analyze pose based on the title passed from the parent component
    switch (pose.title) {
      case "Tree Pose":
        // Landmarks: Ankle (28), Knee (26), Hip (24) for right leg
        //           Ankle (27), Knee (25), Hip (23) for left leg
        const rightKneeAngle = getAngle(
          landmarks[24],
          landmarks[26],
          landmarks[28]
        );
        const leftKneeAngle = getAngle(
          landmarks[23],
          landmarks[25],
          landmarks[27]
        );

        // Check if the standing leg is straight
        if (rightKneeAngle > 170 && landmarks[28].visibility > 0.8) {
          // Check if the other foot is on the inner thigh
          const leftFootY = landmarks[31].y;
          const rightKneeY = landmarks[26].y;
          if (Math.abs(leftFootY - rightKneeY) < 0.1) {
            setFeedback("Place your foot higher on your inner thigh.");
          } else {
            setFeedback("Excellent! Hold the pose.");
          }
        } else if (leftKneeAngle > 170 && landmarks[27].visibility > 0.8) {
          // Same check for the other side
          const rightFootY = landmarks[32].y;
          const leftKneeY = landmarks[25].y;
          if (Math.abs(rightFootY - leftKneeY) < 0.1) {
            setFeedback("Place your foot higher on your inner thigh.");
          } else {
            setFeedback("Excellent! Hold the pose.");
          }
        } else {
          setFeedback(
            "Straighten your standing leg and place your foot correctly."
          );
        }
        break;

      case "Child's Pose":
        // In Child's Pose, the body should be folded forward.
        // We can check the angle of the hips and knees.
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
        const headY = landmarks[0].y;
        const hipsY = landmarks[24].y;

        if (hipAngleLeft < 90 && hipAngleRight < 90 && headY > hipsY) {
          setFeedback("Fold your body forward and relax.");
        } else if (headY > hipsY) {
          setFeedback("Fold your body forward and relax.");
        } else {
          setFeedback("Keep your hips back and your head down.");
        }
        break;

      case "Cobra Pose":
        // In Cobra Pose, the back should be arched, and the chest lifted.
        const backAngle = getAngle(landmarks[11], landmarks[23], landmarks[24]);
        if (backAngle < 150) {
          setFeedback("Lift your chest higher and arch your back.");
        } else {
          setFeedback("Good form! Hold the pose.");
        }
        break;

      case "Mountain Pose":
        // In Mountain Pose, the body should be straight and stable.
        const straightness =
          Math.abs(landmarks[11].x - landmarks[23].x) < 0.05 &&
          Math.abs(landmarks[12].x - landmarks[24].x) < 0.05;
        if (straightness) {
          setFeedback("Stand tall and straight, like a mountain.");
        } else {
          setFeedback("Stand straight with feet hip-width apart.");
        }
        break;

      case "Downward Dog":
        // In Downward Dog, the body forms an inverted V-shape.
        const leftHipAngle = getAngle(
          landmarks[11],
          landmarks[23],
          landmarks[25]
        );
        const rightHipAngleDD = getAngle(
          landmarks[12],
          landmarks[24],
          landmarks[26]
        );

        if (leftHipAngle < 150 || rightHipAngleDD < 150) {
          setFeedback("Lift your hips higher to form an inverted V.");
        } else if (
          landmarks[11].y > landmarks[15].y ||
          landmarks[12].y > landmarks[16].y
        ) {
          setFeedback("Push through your hands to straighten your back.");
        } else {
          setFeedback("Perfect! Hold the pose.");
        }
        break;

      case "Warrior I":
        // In Warrior I, the back leg is straight, and the front knee is bent.
        const frontKneeAngle = getAngle(
          landmarks[24],
          landmarks[26],
          landmarks[28]
        );
        const backLegAngle = getAngle(
          landmarks[23],
          landmarks[25],
          landmarks[27]
        );

        if (frontKneeAngle > 160) {
          setFeedback("Bend your front knee.");
        } else if (backLegAngle < 170) {
          setFeedback("Straighten your back leg.");
        } else {
          setFeedback("Good form! Hold the pose.");
        }
        break;

      default:
        setFeedback("Pose not recognized. Follow the instructions.");
        break;
    }
  };

  useEffect(() => {
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
  }, [isSessionActive, pose.title]);

  const handleEndPracticeClick = () => {
    setIsSessionActive(false);

    // Collect the real session data
    const sessionData = {
      exercise: pose.title,
      sessionDuration: duration,
      averageScore: 92, // You would calculate this based on form analysis
      reps: reps,
      summary: "Workout completed.",
    };

    onEndPractice(sessionData);
  };

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
