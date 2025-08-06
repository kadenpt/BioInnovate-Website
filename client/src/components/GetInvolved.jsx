export default function GetInvolved() {
  return (
    <div className="pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Get Involved</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Join as Student */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
              For Students
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Community</h2>
            <p className="text-gray-600 mb-6">
              Connect with like-minded students, gain hands-on experience, and develop 
              your skills in biotechnology and innovation.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                Access to exclusive workshops and training
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                Mentorship from industry professionals
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                Research project opportunities
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                Networking events and career guidance
              </li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Join as Student
            </button>
          </div>

          {/* Join as Professional */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
              For Professionals
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mentor & Collaborate</h2>
            <p className="text-gray-600 mb-6">
              Share your expertise, mentor the next generation, and collaborate on 
              innovative biotech projects.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                Mentor talented students
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                Access to cutting-edge research
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                Industry-academia partnerships
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                Speaking and workshop opportunities
              </li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
              Join as Professional
            </button>
          </div>
        </div>

        {/* Volunteer Opportunities */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Volunteer Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-purple-100 text-purple-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Event Planning</h3>
              <p className="text-gray-600 text-sm">
                Help organize workshops, conferences, and networking events.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-orange-100 text-orange-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Content Creation</h3>
              <p className="text-gray-600 text-sm">
                Write articles, create social media content, and develop educational materials.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-red-100 text-red-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🔬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Research Support</h3>
              <p className="text-gray-600 text-sm">
                Assist with research projects and laboratory work.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you like to get involved?
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select an option</option>
                <option>Join as a student</option>
                <option>Join as a professional</option>
                <option>Volunteer</option>
                <option>Partner with us</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us more about how you'd like to get involved..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 