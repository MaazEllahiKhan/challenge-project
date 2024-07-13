import Image from "next/image";
'use client'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import messageAllData from './../../utils/data/messages.json';
import userAllData from './../../utils/data/users.json';
import { useEffect, useState } from "react";


export default function Home() {
  const [messageData, setMessageData] = useState(messageAllData);
  const [userData, setUserData] = useState(userAllData);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <Tabs>
          <TabList>
            <Tab>Chat 3</Tab>
            <Tab>Chat 8</Tab>
            <Tab>user 100</Tab>
            <Tab>Message 459</Tab>
          </TabList>
          {/* using maps and filters to display data according to the case */}
          {/* used eval to run script in messages which is not a best practice, taking in consideration the CSRF) attacks */}
          <TabPanel>
            {messageData && messageData.map((item) => {
              return item.chatid === 3 && (
                <div key={item.id} className="shadow-md p-5 -white mb-2">
                  <div className="flex items-center">
                    <div className="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono mr-2" style={{ height: '40px', width: '40px', fontSize: '18px' }}>{item.userid}</div>
                    <span>{userData.filter((user) => user.id === item.userid)[0].username}</span>
                  </div>
                  <div className="mt-1">
                    <p>{item.message}</p>
                  </div>
                </div>
              )
            })
            }
          </TabPanel>
          <TabPanel>
            <div><pre>{JSON.stringify(messageData && messageData.filter((item) => item.chatid === 8), null, 2)}</pre></div>
          </TabPanel>
          <TabPanel>
            <div><pre>{JSON.stringify(userData && userData.map((user) => Object.assign({}, { ...user, password: "********" })).filter((user) => user.id === 100))}</pre></div>
          </TabPanel>
          <TabPanel>
            {messageData && messageData.filter((mess) => mess.id === 459).map((item) => {
              return (
                <div key={item.id} className="shadow-md p-5 -white mb-2">
                  <div className="flex items-center">
                    <div className="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono mr-2" style={{ height: '40px', width: '40px', fontSize: '18px' }}>{item.userid}</div>
                    <span>{userData.filter((user) => user.id === item.userid)[0].username}</span>
                  </div>
                  <div className="mt-1">
                    {/* not recommended for production */}
                    {eval(`${item?.message?.split('<script>').pop()?.split('</script>')[0]}`)}
                    <p>{item.message}</p>
                  </div>
                </div>
              )
            })
            }
          </TabPanel>
        </Tabs>
      </div>
    </main>
  );
}
