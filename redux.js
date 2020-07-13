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



