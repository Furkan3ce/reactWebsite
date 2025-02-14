import React, { Component } from 'react'
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Badge,
    NavItem,
    NavLink
 } from 'reactstrap'


export default class CartSummary extends Component {
   renderEmptyCart(){
    return(<NavItem>
        <NavLink>
            Empty Cart
        </NavLink>
    </NavItem>)
    
   }
    renderSummary(){
        return (
            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
               Your Cart- {this.props.cart.length}
            </DropdownToggle>
            <DropdownMenu right>
                {this.props.cart.map(cartItem=>(
                <DropdownItem key={cartItem.product.id}>
                    <Badge color='danger' onClick={()=>this.props.removeFromCart(cartItem.product)}>Delete</Badge>
                    {cartItem.product.productName}
                    <Badge color='success'>{cartItem.quantity}</Badge>
                </DropdownItem>
                ))}
                
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
        )
    }
    render() {
        return (
            <div>
            {this.props.cart.length>0?this.renderSummary() : this.renderEmptyCart()}
            </div>
        )
    }
}
