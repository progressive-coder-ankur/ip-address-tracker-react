function Details({ data }) {
  if (data !== null) {
    return (
      <div className="details">
        <div className="ip flex flex-column">
          <h3 className="heading">IP Address</h3>
          <p className="data">{data.ip}</p>
        </div>
        <div className="location flex flex-column">
          <h3 className="heading">Location</h3>
          <p className="data">
            {data.location.region}, {data.location.city}
          </p>
        </div>
        <div className="timezone flex flex-column">
          <h3 className="heading">Timezone</h3>
          <p className="data">
            {"UTC "}
            {data.location.timezone}
          </p>
        </div>
        <div className="ISP flex flex-column">
          <h3 className="heading">ISP</h3>
          <p className="data">{data.isp}</p>
        </div>
      </div>
    );
  } else {
    return <div className="details">{"Loading Data"}</div>;
  }
}

export default Details;
