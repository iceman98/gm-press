class MonsterAction extends React.Component {

    constructor(props){
        super(props);

        this.state = {index: props.index, type: props.type, action: props.action};
        this.onRemove = props.onRemove;
        this.onUpdate = props.onUpdate;
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-1">&nbsp;</div>
                <div className="column">
                    <Field title="Name" object="action" index={this.state.index} field="name" parent={this}/>
                    <Field title="Description" object="action" index={this.state.index} field="desc" parent={this} type="textarea"/>
                </div>
                <div className="column">
                    <button className="button is-danger" onClick={()=>this.onRemove(this.state.type, this.state.index)}>Remove</button>
                </div>
            </div>
        );
    }
}