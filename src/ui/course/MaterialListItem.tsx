import React from "react";
import { Grid2 as Grid, Link, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import MarkDone from "./MarkDone";
import DescriptionIcon from "@mui/icons-material/Description";
import { Quiz } from "@mui/icons-material";
import { useUser } from "../../features/users/useUser";
import { roleNames } from "../../Enums/roles";
import { Link as RouterLink } from "react-router-dom";
interface MaterialListItemProps {
  sectionPart: {
    id: number,
    title: string,
    index: number,
    materialType: number,
    file?: {
      id: string,
      name: string,
      contentType: string,
      extension: string,
      path: string
    },
    link?: string,
    passThresholdPoints?: number,
    questions?: []
  }
}

const MaterialListItem: React.FC<MaterialListItemProps> = ({ sectionPart }) => {

  const { user } = useUser();
  return (
    <Grid component={ListItem}
      flexDirection={{ xs: 'column', sm: 'row' }}
      gap={2}
      paddingX={0}
      paddingY={2}
      borderBottom={3}
      borderColor={'primary.light'}
      sx={{
        alignItems: { xs: 'start', sm: "center" },
        justifyContent: "space-between",
      }}
    >
      <Grid container alignItems={'center'} >
        <ListItemIcon
          sx={{
            backgroundColor: `${sectionPart.materialType === 2 ? "#027e7b" : ""}`,
            minWidth: "fit-content",
            mr: 1,
            borderRadius: 1,
            padding: 0.2,
          }}
        >
          {sectionPart.materialType === 2 && <LinkIcon sx={{ color: "#ffffff" }} />}
          {sectionPart.materialType === 1 && <DescriptionIcon sx={{ color: "#FFA726" }} />}
          {sectionPart.materialType === 3 && <Quiz />}
        </ListItemIcon>
        {/* {use link here} */}
        <Link component={RouterLink} to={sectionPart.file?.path || sectionPart.link || ''} target="_blank" >
          <ListItemText primary={sectionPart.title} />
        </Link>
      </Grid>
      {
        (roleNames[user?.role] === 'Staff' && sectionPart.materialType !== 3) &&

        <MarkDone done={false} />
      }

    </Grid>
  );
};
export default MaterialListItem;
