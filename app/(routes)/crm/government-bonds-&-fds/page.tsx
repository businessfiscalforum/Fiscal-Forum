import React from "react";
import CreateLeadForm from "../../_components/CreateLeadForm";
import IndianBondsHero from "../../_components/IndianBondsHero";

const page = () => {
  return (
    <div className="space-y-12">
      {/* Interactive Bond Screener Terminal */}
      <div>
        <IndianBondsHero />
      </div>

      {/* Lead Submission Form */}
      <div>
        <CreateLeadForm type="Government Bonds & FDs" />
      </div>
    </div>
  );
};

export default page;
