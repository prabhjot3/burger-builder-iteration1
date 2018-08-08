import React from 'react';
import Aux from '../../hoc/Aux';
import * as classes from './Layout.css' 
const layout = (props) => (
    <Aux><div>Toolbar, Sidebar</div>
    <main className={classes.Content}>{props.children}</main></Aux>
)
export default layout;