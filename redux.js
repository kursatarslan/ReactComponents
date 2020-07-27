import { Provider } from "react-redux";
import { createStore } from "redux";
import { connect } from "react-redux";


// 1 -Add this function:
function mapStateToProps(state) {
  return {
    count: state.count
  };
}

// Then replace this:
// export default Counter;

// With this:
export default connect(mapStateToProps)(Counter);






// then use the providor in your main tree component
// <Provider store = {store}></Provider>

// then create the reducer and the store
function reducer(state = initialState, action) {
  switch(action.type) {
    case '':
      return {
        anything: anyvalue
      };
    case '':
      return {
        anything: anyvalue
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

// for the action add dispatch in your component
 this.props.dispatch({ type: '' });



Here are the steps for deleting a project:


• on ProjectDetails.js


++ add an event handler like so:


handleDelete = e => {
        const { id } = this.props;
        e.preventDefault();
        this.props.deleteProject(id);
        // you can push to dashboard after deleting...
}


++ add a button inside the component:


<button onClick={this.handleDelete}>Delete</button>


++ inside mapStateToProps, return id: id along with other states so you can grab the id and pass it to the deleteProject() action so your app has a reference on which project to delete:


return {
        id: id,
        ...
}


const mapDistpacthToProps = dispatch => {
    return {
        deleteProject: (id) => dispatch(deleteProject(id))
    }
}


export default compose(
    connect(mapStateToProps, mapDistpacthToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails);


------


• on your store actions --> projectActions.js


export const deleteProject = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    
    firestore.collection('projects').doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'DELETE_PROJECT', id })
      }).catch(err => {
        dispatch({ type: 'DELETE_PROJECT_ERROR', err })
    })
  }
};


------


• on your store reducers --> projectReducer.js


case 'DELETE_PROJECT':
            console.log('delete project');
            return state;
        case 'DELETE_PROJECT_ERROR':
            console.log('delete project error', 'state: ', state, 'action: ', action.project);
            return state;
