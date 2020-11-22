import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="mx-n5" id="landing">
            <img src="./Flight-background.jpg" alt="Flight" className="d-block w-100 mh-75 my-0 mx-auto" height="600" />
            <div className="p-text">
                <p className="font-weight-bold">Fly in peace!</p>
                <h3>Book tickets</h3>
                <Link to="/flights" type="button" className="btn btn-light">
                    Book
                </Link>
                <h3 className="mt-3">Add a flight</h3>
                <Link to="/add" type="button" className="btn btn-light">
                    Add
                </Link>
            </div>
        </div>
    );
}
