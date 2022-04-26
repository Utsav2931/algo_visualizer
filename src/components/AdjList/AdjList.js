import { useState, useEffect } from "react";
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        margin: "10vh 0 0 50vw",
    },
    disabledButton: {
        backgroundColor: '#808080'
    },
    paper: {
        margin: theme.spacing(1),
        zIndex: "1000",
        width: "100vw",
        overflow: "scroll",
        maxHeight: "80vh",
        backgroundColor: "#000000"
    },
    list: {
        display: 'flex',
        justifyContent: "center",
        margin: "auto auto",
        '& > *': {
            margin: theme.spacing(1),
        },
    },

    nodes: {
        display: 'flex',
        flexDirection: "column",
        '& > *': {
            margin: theme.spacing(0.2),
        },
    }

}));



const AdjList = props => {
    const classes = useStyles();
    const nodes = props.nodeIndices.map((key) => (
        <ButtonGroup
            orientation="vertical"
            color="secondary"
            aria-label="vertical outlined primary button group"
        >
            <Button key={key + "123"}>{props.nodeIndices.indexOf(key)}</Button>
        </ButtonGroup>
    ))
    const [edges, setEdges] = useState(null)
    useEffect(() => {
        const newEdges = props.nodeIndices.map(key => {
            let children
            if (props.adjList.get(key).length === 0) {
                children = (null)
            }
            else {
                children = props.adjList.get(key).map(id => {
                    const otherID = props.edgeRefs.get(id).current.getOtherVertexID(key)//getOtherNodeID(id, key)
                    // console.log(otherID)
                    return (<Button key={id}>
                        {props.nodeIndices.indexOf(otherID)}
                    </Button>)
                })
            }

            return (
                <ButtonGroup
                    key={key}
                    orientation="horizontal"
                    color="primary"
                    aria-label="horizontal contained primary button group"
                >
                    {children}
                    <Button disabled classes={{ disabled: classes.disabledButton }}>\</Button>
                </ButtonGroup >)

        })

        setEdges(newEdges)
    }, [props])


    return (
        <>
            <div className={classes.container}>
                <Fade in={props.open}>
                    <Paper elevation={4} className={classes.paper}>
                        <div className={classes.list}>
                            <div className={classes.nodes}>

                                {nodes}
                            </div>
                            <div className={classes.nodes}>
                                {edges}
                            </div>
                        </div>
                    </Paper>
                </Fade>
            </div>

        </>
    );
}

export default AdjList;