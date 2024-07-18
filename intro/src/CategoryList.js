import React, { Component } from 'react'
import { ListGroupItem, ListGroup } from 'reactstrap';

export default class CategoryList extends Component {
  state = {
    categories: [],
     
  };
  componentDidMount(){
    this.getCategories();
  }
  
  getCategories=()=>{
    fetch("http://localhost:3000/categories")
    .then(Response=>Response.json())
    .then(data=>this.setState({categories:data}));;
  }

  render() {
    return (
      <div>
        <h2>
          {this.props.info.title}</h2>
        <ListGroup>
          {
            this.state.categories.map(category => (
              <ListGroupItem
              active={category.categoryName===this.props.currentCategory?true:false} 
              onClick={()=>this.props.changeCategory(category)} 
              key={category.id}>
                {category.categoryName}
              </ListGroupItem>
            ))}
        </ListGroup>
      <h4>{this.props.currentCategory}</h4>
      </div>
    );
  }
} 
