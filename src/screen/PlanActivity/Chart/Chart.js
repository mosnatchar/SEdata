import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
});

class Chart extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;

    return (
      <div>
        <Button aria-describedby={id} variant="contained" onClick={this.handleClick} style={{fontSize : 40}}>
        <p>จำนวน <br/>30 คน</p>
        
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography className={classes.typography}>
                หมู่ 1 15 คน
                <br/>
                หมู่ 2 5 คน
                <br/>
                หมู่ 3 10 คน
                <br/>
                
                
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

Chart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chart);
