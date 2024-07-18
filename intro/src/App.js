import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import {Container, Row, Col} from 'reactstrap';
import React, { Component } from 'react';



export default class App extends Component {

  state={currentCategory:"", products:[], cart:[]};

  componentDidMount(){
    this.getProducts();
  }

  changeCategory = category=>{
    this.setState({ currentCategory : category.categoryName});
    this.getProducts(category.id);
  };

  getProducts = (categoryID) =>{
    let url = "http://localhost:3000/products";

    if(categoryID){
      url += "?categoryID=" + categoryID;
    }
    fetch (url)
    .then(response => response.json() )
    .then(data => this.setState({products:data}))
  };

  addToCart=(product)=>{
    let newCart = this.state.cart
    var addedItem = newCart.find(c=>c.product.id===product.id);
    if(addedItem){
      addedItem.quantity+=1
    }
    else{
      newCart.push ({product:product, quantity:1})
    }
    this.setState({cart:newCart})
  };

  removeFromCart = (product) =>{
    let newCart = this.state.cart.filter(c=>c.product.id!==product.id)
    this.setState({cart:newCart})
  }

  render(){
    let ProductInfo = {title:"Product List"};
    let CategoryInfo = {title:"Category List"};
    return (
      <div>
        <Container>
          <Navi
          removeFromCart={this.removeFromCart}
          cart={this.state.cart}/>
        
          <Row>
          <Col xs="3">
            <CategoryList currentCategory={this.state.currentCategory} 
            changeCategory={this.changeCategory} 
            info = {CategoryInfo}/>
          </Col>
          
          <Col xs="9">
            <ProductList 
            products={this.state.products}
            currentCategory={this.state.currentCategory} 
            info = {ProductInfo}
            addToCart= {this.addToCart}
            />
          </Col>
  
          </Row>
  
        </Container>
        
      </div>
    );
  }
}



