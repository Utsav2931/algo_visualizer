import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'

const ITEM_HEIGHT = 45
const CustomMenu = props => {

    return (
        <div>
            <Button
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                variant="contained"
                size="small"
                pd="5px"
                onClick={props.click}
            >
                {props.selectedOption}
            </Button>
            <Menu
                id="long-menu"
                anchorEl={props.anchor}
                keepMounted
                open={props.open}
                onClose={props.close}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {props?.options && props.options.map((option) => (
                    <MenuItem key={option} selected={option === props.selectedOption} onClick={() => props.selectOption(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default CustomMenu