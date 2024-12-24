import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  accordionDetailsClasses,
  AccordionSlots,
  AccordionSummary,
  Box,
  Button,
  Grid2 as Grid,
  Grow,
  List,
  Typography,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MaterialListItem from "../../ui/course/MaterialListItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { useDialogs } from "@toolpad/core";
import AddMaterialDialog from "../../features/courses/AddMaterialDialog";
import { useUser } from "../../features/users/useUser";
import { roleNames } from "../../Enums/roles";

interface CategoryProps {
  section: {
    id: number,
    title: string
    index: number,
    sectionParts: []
  }
}


const Category: React.FC<CategoryProps> = ({ section }) => {
  const dialogs = useDialogs();

  const { user } = useUser();

  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const openAddMaterial = async () => {
    await dialogs.open(AddMaterialDialog, { sectionId: section.id });
  };
  return (
    <Grid container flexDirection={'column'} padding={1.5} border={2} borderRadius={2} borderColor={'primary.light'}>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        // slots={{ transition: Grow as AccordionSlots["transition"] }}
        slotProps={{ transition: { timeout: 600 } }}
        sx={[
          {
            borderRadius: 5,
            // Curved corners on the overall Accordion component
            overflow: "hidden", // Ensures that contents respect the rounded corners
          },
          expanded
            ? {
              [`& .${accordionClasses.region}`]: {
                height: "auto",
              },
              [`& .${accordionDetailsClasses.root}`]: {
                display: "block",
              },
            }
            : {
              [`& .${accordionClasses.region}`]: {
                height: 0,
              },
              [`& .${accordionDetailsClasses.root}`]: {
                display: "none",
              },
            },
        ]}
      >
        <Box
          sx={{
            backgroundColor: "primary.light",
            // padding: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "",
            // mb: 1,
          }}
        >
          <AccordionSummary
            sx={{
              flexDirection: "row-reverse", // Moves the expand icon to the left
            }}
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                }}
              />
            }
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography
              variant="h6"
              sx={{ ml: 1 }}
              fontWeight="bold"
              color="primary.main"
            >
              {section.title}
            </Typography>
          </AccordionSummary>
        </Box>
        <AccordionDetails>
          {/* Materials : )  */}
          <List sx={{ padding: 0 }}>
            {
              section.sectionParts?.map((sectionPart) => <MaterialListItem key={sectionPart.id} sectionPart={sectionPart} />)
            }

          </List>

          {
            roleNames[user?.role] !== 'Staff' &&
            <Grid
              container
              spacing={1}
              flexDirection={{ xs: 'column', sm: 'row' }}
              sx={{
                padding: 2,
                borderTop: "1px solid #E0E0E0",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                onClick={openAddMaterial}
              >
                Add new material
              </Button>
              <Button
                variant="outlined"
                startIcon={<QuizIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Add new Quiz
              </Button>
            </Grid>
          }
        </AccordionDetails>
      </Accordion >
    </Grid>
  );
};

export default Category;
