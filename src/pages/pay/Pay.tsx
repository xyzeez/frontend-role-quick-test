import { useSearchParams } from "react-router";
import BankInfo from "./BankInfo";
import ContactInfo from "./ContactInfo";
import SenderDetails from "./SenderDetails";

function Pay() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "sender-details";

  return (
    <main className="grid">
      {activeTab === "bank-info" && <BankInfo />}
      {activeTab === "contact-info" && <ContactInfo />}
      {activeTab === "sender-details" && <SenderDetails />}
    </main>
  );
}

export default Pay;
