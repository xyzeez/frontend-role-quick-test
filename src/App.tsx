import CashToCrypto from "./pages/CashToCrypto";
import CryptoToCash from "./pages/CryptoToCash";
import CryptoToFiatLoan from "./pages/CryptoToFiatLoan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabItems = ["Crypto to cash", "Cash to crypto", "Crypto to fiat loan"];

function App() {
  return (
    <div className="bg-grid dark:bg-ui-black bg-ui-white flex h-full w-full items-center justify-center overscroll-none lg:p-8 xl:p-10">
      <main className="grid h-full w-full max-w-[640px] lg:h-fit lg:min-h-[758px]">
        <div className="bg-ui-white grid p-4 pt-8 pb-14 lg:rounded-4xl lg:border lg:px-12 lg:shadow-sm xl:px-16 xl:pt-10">
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
        </div>
      </main>
    </div>
  );
}

export default App;
