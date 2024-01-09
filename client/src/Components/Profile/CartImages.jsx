import React from "react";
import { Image, Grid } from "semantic-ui-react";

export default function CartImages ({ imagePaths }) {
    return (
        <Grid columns={imagePaths.length}>
            {imagePaths.map((imgPath, index) => (
                <Grid.Column>
                    <Image key={index} src={'/' + imgPath.image_path} size="small" rounded />
                </Grid.Column>
            ))}
        </Grid>
    )
}