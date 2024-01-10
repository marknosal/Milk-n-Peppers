import React from "react";
import { Image, Grid } from "semantic-ui-react";

export default function CartImages ({ imagePaths }) {
    return (
        <Grid columns={imagePaths.length}>
            {imagePaths.map((imgPath, index) => (
                <Grid.Column key={imgPath.id || index}>
                    <Image src={'/' + imgPath.image_path} size="small" rounded />
                </Grid.Column>
            ))}
        </Grid>
    )
}