function Input(props) {
  return (
    <div className="relative z-0 w-full mb-2 xl:mb-6 group">
      <input
        type={props.type}
        name={props.name}
        id="input"
        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        value={props.data}
        onChange={(e)=>props.setData(e.target.value)}
      />
      <label
        htmlFor="input"
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {props.title}
      </label>
    </div>
  );
}

export default Input;
