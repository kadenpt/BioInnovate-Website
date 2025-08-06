export default function BioBlog() {
  return (
    <div className="pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">BioBlog</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Featured Article */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Featured Article</h2>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                The Future of CRISPR Technology in Agriculture
              </h3>
              <p className="text-gray-600 mb-4">
                Explore how CRISPR gene editing is revolutionizing crop development and 
                addressing global food security challenges. Our research team discusses 
                the latest breakthroughs and ethical considerations.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span>By Dr. Sarah Chen</span>
                  <span className="mx-2">•</span>
                  <span>March 10, 2024</span>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Regular Articles */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              Research
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Synthetic Biology: Building Life from Scratch
            </h3>
            <p className="text-gray-600 mb-4">
              An overview of synthetic biology techniques and their applications in 
              creating novel biological systems for industrial and medical purposes.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span>By Alex Rodriguez</span>
                <span className="mx-2">•</span>
                <span>March 8, 2024</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-semibold">
                Read →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              Innovation
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Biotech Startups: From Lab to Market
            </h3>
            <p className="text-gray-600 mb-4">
              A guide for researchers and students on how to transform biotech research 
              into successful commercial ventures.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span>By Maria Santos</span>
                <span className="mx-2">•</span>
                <span>March 5, 2024</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-semibold">
                Read →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              Industry
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              The Rise of Personalized Medicine
            </h3>
            <p className="text-gray-600 mb-4">
              How advances in genomics and biotechnology are enabling treatments 
              tailored to individual patients' genetic profiles.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span>By Dr. James Wilson</span>
                <span className="mx-2">•</span>
                <span>March 3, 2024</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-semibold">
                Read →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              Ethics
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Ethical Considerations in Gene Editing
            </h3>
            <p className="text-gray-600 mb-4">
              A discussion on the moral and ethical implications of genetic engineering 
              technologies and their societal impact.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span>By Prof. Lisa Thompson</span>
                <span className="mx-2">•</span>
                <span>March 1, 2024</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-semibold">
                Read →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contribute to BioBlog</h2>
          <p className="text-gray-600 mb-6">
            Have insights to share? We welcome contributions from students, researchers, 
            and industry professionals.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Submit an Article
          </button>
        </div>
      </div>
    </div>
  );
} 