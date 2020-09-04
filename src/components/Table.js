import React from "react";
import "../styles/table.css";
export default function Table({ countries, caseType }) {
    let count = 1;
    return (
        <div className="table">
            {countries
                .sort((one, two) => two[caseType] - one[caseType])
                .map((country) => (
                    <tr>
                        <td>
                            <span className="table__counter">{count++}</span>
                            <span className="table__flag">
                                <img src={country.countryInfo.flag} />
                            </span>
                        </td>
                        <td> {country.country}</td>

                        <td>
                            <strong>{country[caseType]}</strong>
                        </td>
                    </tr>
                ))}
        </div>
    );
}
