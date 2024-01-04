import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { Button, Header, Segment, TransitionablePortal } from 'semantic-ui-react';
// import { useHistory } from 'react-router-dom';

export default function LogoutPortal() {
    const { logout } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [showPortal, setShowPortal] = useState(false)

    // const history = useHistory()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCloseClick = () => {
        setShowPortal(false)
    }

    return (
        <TransitionablePortal
            closeOnDocumentClick={false}
            closeOnEscape={false}
            onOpen={handleOpen}
            onClose={handleClose}
            openOnTriggerClick
            open={showPortal}
            trigger={
                <Button
                    onClick={()=>setShowPortal(!showPortal)}
                    content={"Logout"}
                    className="logout-button"
                />
            }
        >
            <Segment
                style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}
            >
                <Header>Are you sure you want to logout?</Header>
                <Button onClick={logout} positive>Yes</Button>
                <Button onClick={handleCloseClick} negative>No</Button>
            </Segment>
        </TransitionablePortal>
    );
}