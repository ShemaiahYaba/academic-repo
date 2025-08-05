const EditorialTeam = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Editorial Team</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        Meet the dedicated scholars and professionals who curate, review, and advance our academic community. Interested in joining? Apply below!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Mock team members */}
        <div className="flex flex-col items-center">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Editor" className="w-24 h-24 rounded-full mb-2 border-4 border-blue-200" />
          <div className="font-semibold">Dr. John Doe</div>
          <div className="text-sm text-gray-500">Chief Editor</div>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Editor" className="w-24 h-24 rounded-full mb-2 border-4 border-blue-200" />
          <div className="font-semibold">Prof. Jane Smith</div>
          <div className="text-sm text-gray-500">Senior Editor</div>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Editor" className="w-24 h-24 rounded-full mb-2 border-4 border-blue-200" />
          <div className="font-semibold">Dr. Emily Zhang</div>
          <div className="text-sm text-gray-500">Associate Editor</div>
        </div>
      </div>
      <button
        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        disabled
        title="Apply to join the editorial team (coming soon!)"
      >
        Apply to Editorial Team
      </button>
    </div>
  );
};

export default EditorialTeam;
