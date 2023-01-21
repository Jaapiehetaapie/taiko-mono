const posts = [
  {
    title: "Taiko Ambassador Program",
    href: "https://mirror.xyz/labs.taiko.eth/BvcEyYeVIiHnjc-i5qf3zR4s67Jc6nz_R6OSGj5rzOE",
    description:
      "Ethereum has come a long way in its seven-year life — changing the world, in our opinion — but it is only just getting started.",
    date: "Jan 04, 2023",
    datetime: "2023-01-04",
    imageUrl:
      "https://mirror-media.imgix.net/publication-images/5Ed-TXJIB3LTC2HJdPuEN.png?height=512&width=1024&h=512&w=1024&auto=compress",
    readingTime: "2 min",
    author: {
      name: "finestone",
      imageUrl: "https://avatars.githubusercontent.com/u/36642873?v=4",
    },
  },
  {
    title: "Taiko Alpha-1 Testnet is Live",
    href: "https://mirror.xyz/labs.taiko.eth/-lahy4KbGkeAcqhs0ETG3Up3oTVzZ0wLoE1eK_ao5h4",
    description:
      "Today, the Taiko Alpha-1 testnet (a1) is live - our first public testnet! We’ve codenamed this testnet, Snæfellsjökull.",
    date: "Dec 27, 2022",
    datetime: "2022-12-27",
    imageUrl:
      "https://mirror-media.imgix.net/publication-images/4qVW-dWhNmMQr61g91hGt.png?height=512&width=1024&h=512&w=1024&auto=compress",
    readingTime: "4 min",
    author: {
      name: "finestone",
      imageUrl: "https://avatars.githubusercontent.com/u/36642873?v=4",
    },
  },
  {
    title: "Rollup Decentralization",
    href: "https://mirror.xyz/labs.taiko.eth/sxR3iKyD-GvTuyI9moCg4_ggDI4E4CqnvhdwRq5yL0A",
    description:
      "This post explores definitions and high-level ideas of rollup decentralization. It does not cover deep technical detail about decentralizing rollup implementations.",
    date: "Dec 20, 2022",
    datetime: "2022-12-20",
    imageUrl:
      "https://mirror-media.imgix.net/publication-images/NTeYUqYqHo4NqrRGJHvfO.png?height=512&width=1024&h=512&w=1024&auto=compress",
    readingTime: "9 min",
    author: {
      name: "finestone",
      imageUrl: "https://avatars.githubusercontent.com/u/36642873?v=4",
    },
  },
];

import React, { useEffect, useState } from "react";
import { getOriginalDigests } from "./getOriginalDigests";
import { getPosts } from "./getPosts";

const authors = [
  {
    address: "0x381636D0E4eD0fa6aCF07D8fd821909Fb63c0d10",
    profileImg: "https://avatars.githubusercontent.com/u/36642873?v=4",
    name: "finestone",
  },
];

// Add the correct Original-Content-Digest, this is neccesarry for making the link to the mirror page
function addDigests(objects, digests) {
  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < digests.length; j++) {
      if (objects[i].digest === digests[j].node.tags[3].value) {
        objects[i]["OriginalDigest"] = digests[j].node.tags[4].value;
      }
    }
  }
  return objects;
}

// Add the authors picture and name based on the contriboter address
function addAuthorDetails(objects, authors) {
  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < authors.length; j++) {
      if (objects[i].authorship.contributor === authors[j].address) {
        objects[i].authorship["name"] = authors[j].name;
        objects[i].authorship["profileImg"] = authors[j].profileImg;
      }
    }
  }
  return objects;
}

function getReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.split(" ").length;
  const readingTime = Math.round(wordCount / wordsPerMinute);
  return readingTime;


}

function getDate(timestamp: string): string {
  let date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getDateTime(timestamp: string): string {
  let date = new Date(parseInt(timestamp) * 1000);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export default function BlogSection(): JSX.Element {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // This is getting the 'Orginal-Content-Digest' aswell asa the 'Content-Digest', this is nesscary for making the link to the mirror page
    getOriginalDigests.then((result) => {
      const originalDigestsResult = result;

      // Getting the information of the post via the arweave GraphQL and SDK
      getPosts.then((result) => {
        console.log(result)
        // Check if the posts have the required keys
        result = result.filter(function (obj) {
          return obj.hasOwnProperty("wnft");
        });

        // Only use first three posts
        result = result.slice(0, 3);

        // add the OriginalDigest to the post object
        result = addDigests(result, originalDigestsResult);

        // add author details to the post object
        result = addAuthorDetails(result, authors);
        console.log(result);

        setPosts(result);
      });
    });
  }, []);

  

  return (
    <div className="relative bg-neutral-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28 dark:bg-neutral-800">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3 dark:bg-[#1B1B1D]" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-oxanium text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
            Latest Blog Posts
          </h2>
          <div className="mx-auto mt-3 max-w-2xl text-xl text-neutral-500 sm:mt-4 dark:text-neutral-300">
            Check out the full blog at{" "}
            <a href="https://mirror.xyz/labs.taiko.eth" target="_blank">
              mirror.xyz
            </a>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.content.title}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <h3>{post.content.title}</h3>
              <div className="flex-shrink-0">
                <a href={post.href} target="_blank">
                  <img className="h-54 w-full object-cover" src={``} alt="" />
                </a>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6 dark:bg-neutral-800">
                <div className="flex-1">
                  <a
                    href={
                      "https://mirror.xyz/labs.taiko.eth/" + post.OriginalDigest
                    }
                    target="_blank"
                    className="mt-2 block"
                  >
                    <div className="text-xl font-semibold text-neutral-900 dark:text-neutral-200">
                      {post.content.title}
                    </div>
                    <div className="mt-3 text-base text-neutral-500 dark:text-neutral-300">
                      {post.wnft.description}
                    </div>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a>
                      <span className="sr-only">{post.authorship.name}</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={post.authorship.profileImg}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-neutral-900">
                      <a>{post.authorship.name}</a>
                    </div>
                    <div className="flex space-x-1 text-sm text-neutral-500 dark:text-neutral-400">
                      <time dateTime={getDateTime(post.content.timestamp)}>
                        {getDate(post.content.timestamp)}
                      </time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{getReadingTime(post.content.body) + " min"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}