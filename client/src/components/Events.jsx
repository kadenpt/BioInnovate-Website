export default function Events() {
  return (
    <div className="pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Events</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              Upcoming
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Biotech Innovation Workshop</h3>
            <p className="text-gray-600 mb-4">Learn the fundamentals of biotech entrepreneurship</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>📅 March 15, 2024</p>
              <p>🕒 2:00 PM - 5:00 PM</p>
              <p>📍 UBC Life Sciences Centre</p>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Register Now
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              Upcoming
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Industry Networking Night</h3>
            <p className="text-gray-600 mb-4">Connect with biotech professionals and researchers</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>📅 March 22, 2024</p>
              <p>🕒 6:00 PM - 9:00 PM</p>
              <p>📍 UBC Alumni Centre</p>
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Register Now
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              Upcoming
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Research Showcase</h3>
            <p className="text-gray-600 mb-4">Present your biotech research to peers and mentors</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>📅 April 5, 2024</p>
              <p>🕒 1:00 PM - 4:00 PM</p>
              <p>📍 UBC Michael Smith Labs</p>
            </div>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Register Now
            </button>
          </div>

          {/* Past Events */}
          <div className="bg-white rounded-lg shadow-lg p-6 opacity-75">
            <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              Past
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Startup Pitch Competition</h3>
            <p className="text-gray-600 mb-4">Annual competition for biotech startup ideas</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>📅 February 28, 2024</p>
              <p>🕒 3:00 PM - 7:00 PM</p>
              <p>📍 UBC Sauder School of Business</p>
            </div>
            <button className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed">
              Event Ended
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 opacity-75">
            <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              Past
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Lab Safety Workshop</h3>
            <p className="text-gray-600 mb-4">Essential safety training for biotech research</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>📅 February 15, 2024</p>
              <p>🕒 10:00 AM - 12:00 PM</p>
              <p>📍 UBC Safety Training Centre</p>
            </div>
            <button className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed">
              Event Ended
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 opacity-75">
            <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              Past
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Mentorship Program Launch</h3>
            <p className="text-gray-600 mb-4">Kickoff event for our student-mentor matching program</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>📅 January 30, 2024</p>
              <p>🕒 5:00 PM - 7:00 PM</p>
              <p>📍 UBC Student Union Building</p>
            </div>
            <button className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed">
              Event Ended
            </button>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Want to Host an Event?</h2>
          <p className="text-gray-600 mb-6">
            Have an idea for a biotech event? We'd love to hear from you!
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Propose an Event
          </button>
        </div>
      </div>
    </div>
  );
} 