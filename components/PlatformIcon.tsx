
import React from 'react';
import { Platform } from '../types';

interface PlatformIconProps {
  platform: Platform;
  className?: string;
}

const AmazonIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.753 18.736c-.958 0-1.748.243-2.42.72l-.337.284c-.812.678-1.72 1.15-2.916 1.15-1.124 0-2.31-.562-2.31-1.688 0-.938 1.406-1.5 2.813-1.5.956 0 1.747-.244 2.42-.72l.337-.284c.813-.678 1.72-1.15 2.917-1.15 1.125 0 2.31.562 2.31 1.688 0 .937-1.406 1.5-2.812 1.5zm6.54-1.928c-1.196 0-2.105-.472-2.917-1.15l-.337-.284c-.673-.477-1.463-.72-2.42-.72-.958 0-1.748.243-2.42.72l-.337.284c-.813.678-1.721 1.15-2.917 1.15-1.406 0-2.812-.563-2.812-1.5 0-1.125.937-2.063 1.968-2.625l8.83-4.52C18.6 7.37 18.6 6.333 18.6 6.333c0-.853-1.258-1.5-2.812-1.5s-2.813.647-2.813 1.5v.375c0 .91-.563 1.62-1.5 2.063L2.83 12.06c-1.21.613-2.118 1.488-2.118 2.812 0 1.838 2.016 3.094 4.688 3.094 1.95 0 3.52-.8 4.78-1.782l.338-.28c.673-.563 1.346-.89 2.193-.89.848 0 1.522.327 2.194.89l.338.28c1.26 1.07 2.83 1.782 4.78 1.782 2.672 0 4.688-1.256 4.688-3.094 0-1.324-.908-2.2-2.118-2.812l-1.63-1.025z"/>
    </svg>
);

const FlipkartIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6 text-yellow-400" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.203 12.234a.797.797 0 00-.797-.797h-2.125v-1.062c0-.44-.357-.797-.797-.797H5.69a.797.797 0 00-.797.797v1.062H2.625a.797.797 0 000 1.594h2.268v1.062a.797.797 0 00.797.797h12.781c.44 0 .797-.357.797-.797v-1.062h2.125c.44 0 .797-.357.797-.797zm-5.719 3.016H8.312a.797.797 0 100 1.594h8.172a.797.797 0 100-1.594z"/>
    </svg>
);

const EbayIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM8.5 16.5H6v-9h2.5v9zm4 0h-2.5v-9H12.5v9zm4.5 0h-2.5v-9H17v9z" fill="#E53238"/>
        <path d="M12.5 16.5h-2.5v-9H12.5v9z" fill="#0064D3"/>
        <path d="M17 16.5h-2.5v-9H17v9z" fill="#F5AF02"/>
        <path d="M8.5 16.5H6v-9h2.5v9zm8.5 0h-2.5v-9H17v9zm-4.5 0h-2.5v-9H12.5v9z" fill="#86B817"/>
    </svg>
);

const WalmartIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6 text-blue-500" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.66l-1.06 1.06-2.12-2.12-1.06 1.06 2.12 2.12-1.06 1.06-2.12-2.12-1.06 1.06 2.12 2.12-1.06 1.06-1.41-1.41L4.2 12l1.41-1.41-1.06-1.06 2.12 2.12 1.06-1.06-2.12-2.12 1.06-1.06 2.12 2.12 1.06-1.06L12 2.66zm0 18.68l1.06-1.06 2.12 2.12 1.06-1.06-2.12-2.12 1.06-1.06 2.12 2.12 1.06-1.06-2.12-2.12 1.06-1.06 1.41 1.41L19.8 12l-1.41 1.41 1.06 1.06-2.12-2.12-1.06 1.06 2.12 2.12-1.06 1.06-2.12-2.12-1.06 1.06L12 21.34z"/>
    </svg>
);


export const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, className }) => {
  switch (platform) {
    case Platform.AMAZON:
      return <AmazonIcon className={className} />;
    case Platform.FLIPKART:
        return <FlipkartIcon className={className} />;
    case Platform.EBAY:
        return <EbayIcon className={className} />;
    case Platform.WALMART:
        return <WalmartIcon className={className} />;
    default:
      return null;
  }
};
