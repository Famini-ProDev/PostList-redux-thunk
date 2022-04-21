import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { itemsFetchData } from '../actions/items';

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData('https://jsonplaceholder.typicode.com/posts');
    }

    render() {
        if (this.props.hasError) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div style={setMargin}>
                {this.props.items.map((item) => (
                    <div key={item.id}>
                        <ListGroup style={setDistanceBetweenItems}>
                            <ListGroupItem style={borderNone} header={item.title}>
                                <span className="pull-xs-right">Body: {item.body}</span>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                ))}
            </div>
        );
    }
}

var setMargin = {
    padding: "0px 200px 20px 200px"
};
var borderNone = {
    border: "none",
    background: "#fff"
};
var setDistanceBetweenItems = {
    marginBottom: "5px",
    padding: "30px",
    paddingBottom: "50px",
    background: "#fff"
};

ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasError: state.itemsHaveError,
        isLoading: state.itemsAreLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
