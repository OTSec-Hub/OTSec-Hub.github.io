import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const StyledSocialLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  
  a {
    color: inherit;
    transition: all 0.2s ease;
    font-size: 1.5rem;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const SocialLinks = () => {
  // Hardcoded social links data
  const socialLinks = [
    // { 
    //   provider: "github", 
    //   url: "https://github.com/yourusername",
    //   label: "GitHub profile"
    // },
    // { 
    //   provider: "linkedin", 
    //   url: "https://linkedin.com/in/yourprofile",
    //   label: "LinkedIn profile"
    // },
    // { 
    //   provider: "twitter", 
    //   url: "https://twitter.com/yourhandle",
    //   label: "Twitter profile"
    // },
    // { 
    //   provider: "facebook", 
    //   url: "https://facebook.com/yourpage",
    //   label: "Facebook page"
    // },
    // { 
    //   provider: "instagram", 
    //   url: "https://instagram.com/yourprofile",
    //   label: "Instagram profile"
    // },
    // { 
    //   provider: "tiktok", 
    //   url: "https://tiktok.com/@yourusername",
    //   label: "TikTok profile"
    // },
    // { 
    //   provider: "blog", 
    //   url: "https://yourblog.com",
    //   label: "Personal blog"
    // }
  ];

  const getSocialIcon = (provider) => {
    const icons = {
      linkedin: "fa-brands:linkedin",
      twitter: "fa6-brands:square-x-twitter",
      facebook: "fa-brands:facebook-square",
      instagram: "fa-brands:instagram-square",
      tiktok: "fa-brands:tiktok",
      github: "icomoon-free:github",
      blog: "ph:link-bold",
      default: "ph:link-bold"
    };
    return <Icon icon={icons[provider] || icons.default} />;
  };

  return (
    <StyledSocialLinks>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          aria-label={link.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getSocialIcon(link.provider)}
        </a>
      ))}
    </StyledSocialLinks>
  );
};

export default SocialLinks;
