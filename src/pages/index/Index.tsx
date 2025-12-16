import CashToCrypto from "@/pages/index/CashToCrypto";
import CryptoToCash from "@/pages/index/CryptoToCash";
import CryptoToFiatLoan from "@/pages/index/CryptoToFiatLoan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabItems = ["Crypto to cash", "Cash to crypto", "Crypto to fiat loan"];

function Index() {
  return (
    <main>
      <Tabs defaultValue={tabItems[0]} className="gap-10">
        <TabsList className="bg-ui-gray-4 mx-auto h-fit rounded-4xl p-0">
          {tabItems.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="text-ui-gray-2 dark:data-[state=active]:bg-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground hover:text-primary rounded-4xl border-none px-2.5 py-2 text-xs font-medium outline-0 lg:px-4 lg:text-sm"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="Crypto to cash">
          <CryptoToCash />
        </TabsContent>
        <TabsContent value="Cash to crypto">
          <CashToCrypto />
        </TabsContent>
        <TabsContent value="Crypto to fiat loan">
          <CryptoToFiatLoan />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default Index;
