import React from 'react'

const WellnessJourneyPage = () => {
  return (
    <div>
            <div className="bg-white py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center bg-green-500 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              For your Fitness
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
              Transform Your{" "}
              <span className="text-blue-500">Wellness Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover personalized fitness solutions designed to help you
              achieve your health goals
            </p>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Yoga */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  {/* Placeholder for the image */}
                  <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center">
                    {/* Placeholder icon */}
                    <span className="text-4xl" role="img" aria-label="Yoga">
                      🧘‍♀️
                    </span>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Yoga</h3>
                  <Rating score="4.9" />
                </div>
                <p className="text-center text-gray-600 mb-6">
                  Find inner peace and flexibility with guided yoga sessions
                </p>
                <ul className="list-none space-y-2 mb-8">
                  <BulletPoint text="Beginner Friendly" />
                  <BulletPoint text="Expert Instructors" />
                  <BulletPoint text="Stress Relief" />
                </ul>
              </div>
              <div className="mt-auto">
                <Link
                  to="/Yoga"
                  className="flex items-center justify-center text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                >
                  Explore Yoga
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 2: Gym */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  {/* Placeholder for the image */}
                  <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
                    {/* Placeholder icon */}
                    <span className="text-4xl" role="img" aria-label="Gym">
                      💪
                    </span>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Gym</h3>
                  <Rating score="4.8" />
                </div>
                <p className="text-center text-gray-600 mb-6">
                  Strength training and cardio workouts for all fitness levels
                </p>
                <ul className="list-none space-y-2 mb-8">
                  <BulletPoint text="Professional Equipment" />
                  <BulletPoint text="Personal Training" />
                  <BulletPoint text="Group Classes" />
                </ul>
              </div>
              <div className="mt-auto">
                <Link
                  to="/Gym"
                  className="flex items-center justify-center text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                >
                  Explore Gym
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 3: Diet Generation */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  {/* Placeholder for the image */}
                  <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center">
                    {/* Placeholder icon */}
                    <span className="text-4xl" role="img" aria-label="Diet">
                      🥗
                    </span>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Diet Generation
                  </h3>
                  <Rating score="4.9" />
                </div>
                <p className="text-center text-gray-600 mb-6">
                  Personalized nutrition plans tailored to your health goals
                </p>
                <ul className="list-none space-y-2 mb-8">
                  <BulletPoint text="Custom Meal Plans" />
                  <BulletPoint text="Nutritionist Approved" />
                  <BulletPoint text="Health Tracking" />
                </ul>
              </div>
              <div className="mt-auto">
                <Link
                  to="/DietGeneration"
                  className="flex items-center justify-center text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                >
                  Explore Diet Generation
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 4: Mental Health */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  {/* Placeholder for the image */}
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center">
                    {/* Placeholder icon */}
                    <span
                      className="text-4xl"
                      role="img"
                      aria-label="Mental Health"
                    >
                      🧠
                    </span>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Mental Health
                  </h3>
                  <Rating score="4.9" />
                </div>
                <p className="text-center text-gray-600 mb-6">
                  Guided meditations, mood tracking, and self-assessment tools
                  for a healthy mind
                </p>
                <ul className="list-none space-y-2 mb-8">
                  <BulletPoint text="Anxiety Relief" />
                  <BulletPoint text="Mindfulness Exercises" />
                  <BulletPoint text="Stress Management" />
                </ul>
              </div>
              <div className="mt-auto">
                <Link
                  to="/MentalHealth"
                  className="flex items-center justify-center text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                >
                  Explore Mental Health
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <div className="bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center">
                    <span className="text-4xl" role="img" aria-label="Jumba">
                      💃
                    </span>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Jumba</h3>
                  <Rating score="4.8" />
                </div>
                <p className="text-center text-gray-600 mb-6">
                  Upbeat, dance-based workouts to boost your energy and improve
                  your mood
                </p>
                <ul className="list-none space-y-2 mb-8">
                  <BulletPoint text="Cardio Workouts" />
                  <BulletPoint text="Rhythmic Exercise" />
                  <BulletPoint text="Full-Body Fitness" />
                </ul>
              </div>
              <div className="mt-auto">
                <Link
                  to="/Jumba"
                  className="flex items-center justify-center text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                >
                  Explore Jumba
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 2: Meditation */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
                    <span
                      className="text-4xl"
                      role="img"
                      aria-label="Meditation"
                    >
                      🧘
                    </span>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Meditation
                  </h3>
                  <Rating score="4.9" />
                </div>
                <p className="text-center text-gray-600 mb-6">
                  Guided sessions to calm your mind, improve focus, and reduce
                  stress
                </p>
                <ul className="list-none space-y-2 mb-8">
                  <BulletPoint text="Mindfulness" />
                  <BulletPoint text="Breathing Exercises" />
                  <BulletPoint text="Inner Peace" />
                </ul>
              </div>
              <div className="mt-auto">
                <Link
                  to="/Meditation"
                  className="flex items-center justify-center text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                >
                  Explore Meditation
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WellnessJourneyPage
