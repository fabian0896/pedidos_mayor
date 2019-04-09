import React, {Component} from 'react'
import NewProductForm from '../NewProductForm'
import { getProductLines } from '../../../lib/searchService'


class NewProductMobile extends Component{

    state={
        linesOptions: []
    }
    
    getLines = async ()=>{
        const lines = await getProductLines()
        const linesOptions = lines.map(line =>({label: line.name, value: line.name}))
        this.setState({linesOptions})
        return
    }

    componentDidMount(){
        this.getLines()
    }

    render(){
        const { linesOptions } = this.state

        return(
            <div>
                <NewProductForm
                    editingValues={{}}
                    linesOptions={linesOptions} />
            </div>
        )
    }
}


export default NewProductMobile