
const CartItem = () => {
  return (
    <div className="flex flex-col md:flex-row p-4 border-b border-gray-200">
      <img
        src="path-to-image" // Replace with the path to your image
        alt="Kandel London Hard Sided PP 4 Wheel Spinners"
        className="w-32 h-32 md:w-40 md:h-40 object-cover mx-auto md:mx-0"
      />
      <div className="flex-grow px-4 mt-4 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-lg font-semibold text-center md:text-left">
            Kandel London Hard Sided PP 4 Wheel Spinners, E...
          </h2>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">Delivery by Tue Jul 30</p>
        </div>
        <p className="text-sm text-gray-500 mt-1 text-center md:text-left">
          Seller: yoursluggage <span className="text-blue-500 font-semibold">Assured</span>
        </p>
        <div className="flex flex-col md:flex-row items-center mt-2">
          <div className="flex items-center">
            <p className="text-gray-500 line-through mr-2">₹9,999</p>
            <p className="text-2xl font-bold text-green-600">₹1,499</p>
            <p className="text-sm text-green-600 ml-2">85% Off</p>
          </div>
          <p className="text-sm text-green-600 mt-1 md:mt-0 md:ml-4">2 offers applied</p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-4">
          <div className="flex items-center">
            <button className="border border-gray-300 p-1">-</button>
            <span className="px-4">1</span>
            <button className="border border-gray-300 p-1">+</button>
          </div>
          <div className="flex mt-2 md:mt-0">
            <button className="ml-0 md:ml-4 text-blue-500">SAVE FOR LATER</button>
            <button className="ml-4 text-blue-500">REMOVE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
