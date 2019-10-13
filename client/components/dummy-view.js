import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getData } from '../redux/reducers/users'
import Head from './head'

const Dummy = (props) => {
  const [counter] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const { getData: getDataProps } = props
  useEffect(() => { getDataProps(pageIndex) }, [getDataProps, pageIndex])
  return (
    <div>
      <Head title="Hello" />
      <div> Hello World {counter} {pageIndex}</div>
      <div> {JSON.stringify(props.isRequesting)} </div>
      <button
        type="button"
        onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
      >
        Previous
      </button>
      <button
        type="button"
        onClick={() => setPageIndex(pageIndex + 1)}
      >
        Next
      </button>
      <table>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Company</td>
          <td>Salary</td>
          <td>Age</td>
          <td>UserName</td>
          <td>Country</td>
          <td>City</td>
        </tr>
        {
          !props.isRequesting && props.users.map(user => (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company}</td>
              <td>{user.salary}</td>
              <td>{user.age}</td>
              <td>{user.userName}</td>
              <td>{user.country}</td>
              <td>{user.city}</td>
            </tr>
          ))
        }
      </table>
      <img src={`/tracker/${counter}.gif`} alt="tracker" />
    </div>
  )
}

Dummy.propTypes = {}

const mapStateToProps = state => ({
  users: state.users.list,
  isRequesting: state.users.isRequesting
})

const mapDispatchToProps = dispatch => bindActionCreators({ getData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dummy)
