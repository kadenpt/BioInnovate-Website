import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    author: "",
    snippet: "",
    body: "",
    image: "",
    datePosted: new Date().toISOString().split('T')[0], // Default to today's date
  });
  const [isNew, setIsNew] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
      if (record.image) {
        setImagePreview(record.image);
      }
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setImageFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    updateForm({ image: "" });
  };

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    
    let imageUrl = form.image; // Keep existing URL if no new file
    
    // If there's a new image file, upload it first
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadResponse = await fetch('http://localhost:5050/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
        
        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.imageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
        return;
      }
    }

    const record = { ...form, image: imageUrl };
    
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ author: "", snippet: "", body: "", image: "", datePosted: new Date().toISOString().split('T')[0] });
      setImageFile(null);
      setImagePreview("");
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Article Record</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Article Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            <div className="sm:col-span-4">
              <label
                htmlFor="author"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Author Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="author"
                    id="author"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="John Doe"
                    value={form.author}
                    onChange={(e) => updateForm({ author: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="snippet"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Snippet
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="snippet"
                    id="snippet"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Brief description of the article..."
                    value={form.snippet}
                    onChange={(e) => updateForm({ snippet: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="body"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Article Body
              </label>
              <div className="mt-2">
                <textarea
                  name="body"
                  id="body"
                  rows={8}
                  className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Write your article content here..."
                  value={form.body}
                  onChange={(e) => updateForm({ body: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Article Image (Optional)
              </label>
              <div className="mt-2">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-lg p-3 text-center transition-colors ${
                      dragActive
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-300 hover:border-slate-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-1">
                      <svg
                        className="mx-auto h-6 w-6 text-slate-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-slate-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFileInput}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="datePosted"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Date Posted
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="date"
                    name="datePosted"
                    id="datePosted"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={form.datePosted}
                    onChange={(e) => updateForm({ datePosted: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value={isNew ? "Create Article" : "Update Article"}
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}