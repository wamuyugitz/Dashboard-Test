import React, { useEffect, useState, useMemo } from "react";
import ComponentCard from "../components/componentCard/ComponentCard";
import "./Main.css";
import {
  Construction as ConstructionIcon,
  HomeRepairService as HomeRepairServiceIcon,
  GppMaybe as GppMaybeIcon,
  SquareFoot as SquareFootIcon,
  Storefront as StorefrontIcon,
  ConnectWithoutContact as ConnectWithoutContactIcon,
} from "@mui/icons-material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Tool from "../components/main/tool/Tool";
import Order from "../components/main/order/Order";
import Missing from "../components/main/missing/Missing";
import Availability from "../components/main/availability/Availability";
import Restock from "../components/main/restock/Restock";
import Reception from "../components/main/reception/Reception";
import { onValue, ref } from "firebase/database";
import { db } from "../firebaseConfig";

// Defining the shape of the data being used
interface TeamMember {
  teamMemberId: string;
  name: string;
  photo: string;
}

interface ToolData {
  id: string;
  toolRef: string;
  teamMemberId: string;
  status: string;
  duration: string;
}

interface AllData {
  tools: ToolData[];
  teamMembers: TeamMember[];
  missingItems: string[];
  availability: Record<string, any>;
  receptionData: {
    packagesReceived: { value: number };
    processedPackages: { value: number };
  };
}

const Main: React.FC = () => {
  const [allData, setAllData] = useState<AllData | null>(null);

  // Fetching data from Firebase
  useEffect(() => {
    const dataRef = ref(db);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAllData(data);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Merging tools and team members data
  const mergedData = useMemo(() => {
    if (!allData?.tools || !allData?.teamMembers) return [];

    return allData.tools.map((tool) => {
      const teamMember = allData.teamMembers.find(
        (member) => member.teamMemberId === tool.teamMemberId
      );

      return {
        id: tool.id,
        toolRef: tool.toolRef,
        teamMember: {
          name: teamMember?.name || "Unknown",
          photo: teamMember?.photo || "https://via.placeholder.com/28",
        },
        status: tool.status,
        duration: tool.duration,
      };
    });
  }, [allData]);

  // Getting missing items data
  const missingItems = useMemo(() => {
    if (!allData?.missingItems || !allData?.tools || !allData?.teamMembers)
      return [];

    return allData.missingItems.map((toolRef, index) => {
      const tool = allData.tools.find((tool) => tool.toolRef === toolRef);
      const teamMember = allData.teamMembers.find(
        (member) => member.teamMemberId === tool?.teamMemberId
      );

      return {
        id: `missing-${index}`, // Generate a unique id
        toolRef: tool?.toolRef || "",
        teamMember: {
          name: teamMember?.name || "Unknown",
          photo: teamMember?.photo || "https://via.placeholder.com/28",
        },
      };
    });
  }, [allData]);

  // Modifying this useMemo to include toolName for each tool when passing to Restock
  const restockData = useMemo(() => {
    if (!allData?.tools) return [];

    return allData.tools.map((tool) => ({
      id: tool.id,
      toolRef: tool.toolRef,
      toolName: `Tool Name for ${tool.toolRef}`,
    }));
  }, [allData]);

  const components = [
    {
      width: 65,
      icon: ConstructionIcon,
      title: "Rental Tools",
      body: <Tool data={mergedData} />,
    },
    {
      width: 30,
      icon: HomeRepairServiceIcon,
      title: "Work Order Status",
      body: <Order data={mergedData} />,
    },
    {
      width: 30,
      icon: SquareFootIcon,
      title: "Tools and Equipments Availability",
      body: (
        <Availability
          data={
            allData?.availability ? Object.values(allData.availability) : []
          }
        />
      ),
    },
    {
      width: 65,
      icon: GppMaybeIcon,
      title: "Missing Items",
      body: <Missing data={missingItems} />,
    },
    {
      width: 65,
      icon: StorefrontIcon,
      title: "Restock Items",
      body: <Restock data={restockData} />,
    },
    {
      width: 30,
      icon: ConnectWithoutContactIcon,
      title: "Reception Summary",
      body: (
        <Reception
          data={[
            {
              icon: <LocalShippingIcon />,
              label: "Packages Received",
              value: allData?.receptionData?.packagesReceived?.value || 0,
            },
            {
              icon: <AccountTreeIcon />,
              label: "Processed Packages",
              value: allData?.receptionData?.processedPackages?.value || 0,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="main">
      <div className="container">
        <div className="row d-flex">
          {components.map(({ icon: Icon, title, width, body }, index) => (
            <ComponentCard
              key={index}
              icon={<Icon />}
              title={title}
              width={width}
            >
              {body}
            </ComponentCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
