import React, { Component } from 'react';
import { connect } from 'react-redux';
import Translate from 'react-translate-component';
import { Table, Column } from 'fixed-data-table-2';

import { getAudits } from '../../reducers/administration';

export class AuditsPage extends Component {

  constructor(props) {
    super(props);
    this.getAuditList = this.getAuditList.bind(this);
  }

  componentDidMount() {
    this.props.getAudits();
  }

  getAuditList() {
    if (!this.props.isFetching) {
      this.props.getAudits();
    }
  }

  render() {
    const { audits, isFetching } = this.props;
    return (
      <div className="well">
        <div>
          <h2 translate="audits.title">Audits</h2>
          FIX ME pagination and filter by date and sorting
          <hr />
          <div className="row">
            <div className="col-sm-12">
              <Table rowHeight={50}
                rowsCount={audits.length}
                headerHeight={50}
                width={1000}
                maxHeight={500} >
                <Column
                  header={<Cell>Time stamp</Cell>}
                  cell={<TextCell data={audits} col="timestamp" />}
                  flexGrow={1}
                  width={100}
                />
                <Column
                  header={<Cell>Principal</Cell>}
                  cell={<TextCell data={audits} col="principal" />}
                  flexGrow={1}
                  width={100}
                />
                <Column
                  header={<Cell>Address</Cell>}
                  cell={<NestedTextCell data={audits} col="data" child="remoteAddress" />}
                  flexGrow={1}
                  width={100}
                />
                <Column
                  header={<Cell>Type</Cell>}
                  cell={<TextCell data={audits} col="type" />}
                  flexGrow={1}
                  width={100}
                />
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ administration }) => ({ audits: administration.audits, isFetching: administration.isFetching }),
  { getAudits }
)(AuditsPage);
