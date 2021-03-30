import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
export default class ButtomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          name: "xyz",
          email: "email@gmail.com",
          role: "Staff",
          status: "Active",
        },
        {
          name: "xyz",
          email: "email1@gmail.com",
          role: "Staff",
          status: "Active",
        },
        {
          name: "xyz",
          email: "email2@gmail.com",
          role: "Staff",
          status: "Deactive",
        },
        {
          name: "xyz",
          email: "email3@gmail.com",
          role: "Staff",
          status: "Deactive",
        },
        {
          name: "xyz",
          email: "emai5l@gmail.com",
          role: "Staff",
          status: "Active",
        },
      ],
      columns: [
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Role", field: "role", sortable: true, filter: true },
        { headerName: "Status", field: "status", sortable: true, filter: true },
      ],
    };
  }
  render() {
    return (
      <>
        <div
          className='ag-theme-alpine'
          style={{ height: "30vh", width: "100%", marginTop: "10px" }}
        >
          <AgGridReact
            rowData={this.state.users}
            columnDefs={this.state.columns}
          />
        </div>
      </>
    );
  }
}
