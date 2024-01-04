import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { Button, Header, Segment, TransitionablePortal } from 'semantic-ui-react';

export default function LogoutPortal() {
    const { logout } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <TransitionablePortal
            // closeOnTriggerClick={false}
            // closeOnDocumentClick={false}
            // closeOnEscape={false}
            onOpen={handleOpen}
            onClose={handleClose}
            openOnTriggerClick
            open={open}
            trigger={
                <Button
                    onClick={()=>setOpen(!open)}
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
                <Button onClick={() => setOpen(false)} negative>No</Button>
            </Segment>
        </TransitionablePortal>
    );
}