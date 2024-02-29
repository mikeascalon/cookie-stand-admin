export default function QuestionForm(props) {
    
    return (
      <form onSubmit={props.onSubmit} className="flex flex-col p-8 mx-auto my-4 bg-gray-200 rounded-lg" style={{width: '80%'}} >
        <h2 className="mb-4 text-xl font-semibold">Add a new Cookie Stand</h2>
        <div className="mb-4">
          <input name="location" className="w-full h-10 pl-1" placeholder={`${props.lastLocation ? ` ${props.lastLocation}` : ''}`} />
        </div>
        <div className="flex justify-between space-x-2">
          <div className="flex flex-col">
            <label htmlFor="minCustomers">Minimum Customers per Hour</label>
            <input type="number" name="minCustomers" className="flex-grow pl-1"  />
          </div>
          <div className="flex flex-col">
            <label htmlFor="maxCustomers">Maximum Customers per Hour</label>
            <input type="number" name="maxCustomers" className="flex-grow pl-1"  />
          </div>
          <div className="flex flex-col">
            <label htmlFor="avgCookies">Average Cookies per Sale</label>
            <input type="number" name="avgCookies" className="flex-grow pl-1"  />
          </div>
          <button className="self-end h-10 px-2 bg-gray-500 text-gray-50">Create</button>
        </div>
      </form>
    );
  }