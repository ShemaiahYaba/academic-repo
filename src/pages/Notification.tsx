
import { marginLineHorizontal } from "../constants/images";

const Post = () => {
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      icon: "📩",
      message: "Your standard subscription plans expire in two days.",
    },
    {
      id: 2,
      icon: "👤",
      message: "You have a direct message from Alex Bricks.",
    },
    {
      id: 3,
      icon: "👍",
      message: "David Walker and 8 others liked your book.",
    },
    {
      id: 4,
      icon: "✉️",
      message: "You got a new mail.",
    },
    {
      id: 5,
      icon: "🅱️",
      message: "You have a new review on your last post.",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <img className="pt-2 mx-auto" src={marginLineHorizontal} alt="Divider" />
      </div>

      {/* Notifications List */}
      <div className="mt-6">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`flex items-center gap-4 p-4 rounded-sm mb-4 ${
              index % 2 === 0 ? "bg-blue-50" : "bg-white"
            }`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 text-2xl">{notification.icon}</div>

            {/* Message */}
            <p className="text-lg text-gray-700">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
