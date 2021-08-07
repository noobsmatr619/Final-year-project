import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table-6';
import { Button } from 'react-bootstrap';
class TopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Injury',
          accessor: 'Injury',
          width: 150,
          Cell: (row) => row?.value
        },
        {
          Header: 'FirstAid',
          accessor: 'FirstAid',
          width: 150,
          Cell: (row) => row?.value
        },
        {
          Header: 'location',
          accessor: 'location',
          width: 150,
          Cell: (row) => row?.value
        },
        {
          Header: 'Equipment',
          accessor: 'Equipment',
          width: 150,
          Cell: (row) => row?.value
        },
        {
          Header: 'Action',
          accessor: 'action',
          width: 250,
          Cell: (row) => {
            console.log(row);
            return (
              <>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={async (e) => {
                    console.log(row?.original._id);
                  }}>
                  Edit
                </Button>{' '}
              </>
            );
          }
        }
      ]
    };
  }
  render() {
    return (
      <>
        <div
          className="ag-theme-alpine"
          style={{ height: '80vh', width: '100%', marginTop: '10px' }}>
          <ReactTable
            data={this.props.accident}
            columns={this.state.columns}
            noDataText={'no Recod Found!'}
            minRows={10}
            defaultPageSize={10}
            minWidth={1000}
            height={50}
            loading={false}
            loadingText={'Loading...'}
            showFilters={true}
            className="react-table -striped -highlight"
          />
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  accident: state.app.locationAccidents
});
export default connect(mapStateToProps, null)(TopContainer);
