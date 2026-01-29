'use client';

import { useState } from 'react';
import { Icons } from './Icons';
import {
  SERVICE_TYPES,
  BUSINESS_CATEGORIES,
  ServiceType,
  BusinessCategory,
  ServiceTypeInfo,
  BusinessCategoryInfo,
} from '@/app/data/healthcare/service-types';

interface ServiceCategoryNavProps {
  selectedServiceType: ServiceType | null;
  selectedBusinessCategory: BusinessCategory | null;
  onSelectServiceType: (type: ServiceType | null) => void;
  onSelectBusinessCategory: (category: BusinessCategory | null) => void;
  variant?: 'full' | 'compact';
}

// Map icon names to actual icon components
const getServiceIcon = (iconName: string) => {
  const iconMap: Record<string, (props: { className?: string }) => JSX.Element> = {
    snfBuilding: Icons.snfBuilding,
    alfHeart: Icons.alfHeart,
    ilHome: Icons.ilHome,
    hospiceDove: Icons.hospiceDove,
    homeHealth: Icons.homeHealth,
    ccrcCampus: Icons.ccrcCampus,
    memoryBrain: Icons.memoryBrain,
    rehabTherapy: Icons.rehabTherapy,
    clinicalHeart: Icons.clinicalHeart,
    financeChart: Icons.financeChart,
    censusUsers: Icons.censusUsers,
    maDeal: Icons.maDeal,
    salesGrowth: Icons.salesGrowth,
    complianceShield: Icons.complianceShield,
    staffingPeople: Icons.staffingPeople,
    operationsGear: Icons.operationsGear,
  };
  return iconMap[iconName] || Icons.template;
};

export function ServiceCategoryNav({
  selectedServiceType,
  selectedBusinessCategory,
  onSelectServiceType,
  onSelectBusinessCategory,
  variant = 'full',
}: ServiceCategoryNavProps) {
  const [activeTab, setActiveTab] = useState<'service' | 'business'>('service');
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll ? SERVICE_TYPES : SERVICE_TYPES.slice(0, 4);
  const displayedCategories = showAll ? BUSINESS_CATEGORIES : BUSINESS_CATEGORIES.slice(0, 4);

  const handleServiceClick = (type: ServiceType) => {
    if (selectedServiceType === type) {
      onSelectServiceType(null);
    } else {
      onSelectServiceType(type);
      onSelectBusinessCategory(null);
    }
  };

  const handleCategoryClick = (category: BusinessCategory) => {
    if (selectedBusinessCategory === category) {
      onSelectBusinessCategory(null);
    } else {
      onSelectBusinessCategory(category);
      onSelectServiceType(null);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap gap-2">
        {SERVICE_TYPES.slice(0, 4).map(service => {
          const IconComponent = getServiceIcon(service.icon);
          const isSelected = selectedServiceType === service.id;
          return (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? 'text-white shadow-lg'
                  : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
              }`}
              style={isSelected ? { backgroundColor: service.color } : {}}
            >
              <IconComponent className="w-4 h-4" />
              {service.shortName}
            </button>
          );
        })}
        {BUSINESS_CATEGORIES.slice(0, 2).map(category => {
          const IconComponent = getServiceIcon(category.icon);
          const isSelected = selectedBusinessCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? 'text-white shadow-lg'
                  : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
              }`}
              style={isSelected ? { backgroundColor: category.color } : {}}
            >
              <IconComponent className="w-4 h-4" />
              {category.name.split(' ')[0]}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab('service')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'service'
              ? 'bg-[#4ECDC4] text-[#0a1929] shadow-lg'
              : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
          }`}
        >
          <Icons.building className="w-4 h-4" />
          By Facility Type
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'business'
              ? 'bg-[#4ECDC4] text-[#0a1929] shadow-lg'
              : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
          }`}
        >
          <Icons.briefcase className="w-4 h-4" />
          By Business Function
        </button>

        {(selectedServiceType || selectedBusinessCategory) && (
          <button
            onClick={() => {
              onSelectServiceType(null);
              onSelectBusinessCategory(null);
            }}
            className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--muted)] text-[var(--text-muted)] hover:bg-[var(--card)] transition-colors"
          >
            <Icons.x className="w-3 h-3" />
            Clear Filter
          </button>
        )}
      </div>

      {/* Service Types Grid */}
      {activeTab === 'service' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {displayedServices.map(service => {
            const IconComponent = getServiceIcon(service.icon);
            const isSelected = selectedServiceType === service.id;
            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`group relative p-4 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-transparent shadow-xl scale-[1.02]'
                    : 'border-[var(--border-color)] hover:border-[rgba(78,205,196,0.5)] bg-[var(--card)]'
                }`}
                style={isSelected ? {
                  backgroundColor: service.color,
                  borderColor: service.color,
                } : {}}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isSelected
                      ? 'bg-white/20'
                      : 'bg-[var(--muted)]'
                  }`}
                >
                  <IconComponent
                    className={`w-6 h-6 ${isSelected ? 'text-white' : ''}`}
                    style={!isSelected ? { color: service.color } : {}}
                  />
                </div>
                <h3
                  className={`font-semibold text-sm mb-1 ${
                    isSelected ? 'text-white' : 'text-[var(--foreground)]'
                  }`}
                >
                  {service.shortName}
                </h3>
                <p
                  className={`text-xs leading-relaxed ${
                    isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {service.name}
                </p>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <Icons.check className="w-5 h-5 text-white" />
                  </div>
                )}
              </button>
            );
          })}
          {!showAll && SERVICE_TYPES.length > 4 && (
            <button
              onClick={() => setShowAll(true)}
              className="p-4 rounded-2xl border-2 border-dashed border-[var(--border-color)] hover:border-[#4ECDC4] transition-colors text-center flex flex-col items-center justify-center"
            >
              <Icons.plus className="w-6 h-6 text-[var(--text-muted)] mb-2" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                +{SERVICE_TYPES.length - 4} More
              </span>
            </button>
          )}
        </div>
      )}

      {/* Business Categories Grid */}
      {activeTab === 'business' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {displayedCategories.map(category => {
            const IconComponent = getServiceIcon(category.icon);
            const isSelected = selectedBusinessCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group relative p-4 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-transparent shadow-xl scale-[1.02]'
                    : 'border-[var(--border-color)] hover:border-[rgba(78,205,196,0.5)] bg-[var(--card)]'
                }`}
                style={isSelected ? {
                  backgroundColor: category.color,
                  borderColor: category.color,
                } : {}}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isSelected
                      ? 'bg-white/20'
                      : 'bg-[var(--muted)]'
                  }`}
                >
                  <IconComponent
                    className={`w-6 h-6 ${isSelected ? 'text-white' : ''}`}
                    style={!isSelected ? { color: category.color } : {}}
                  />
                </div>
                <h3
                  className={`font-semibold text-sm mb-1 ${
                    isSelected ? 'text-white' : 'text-[var(--foreground)]'
                  }`}
                >
                  {category.name.split(' ')[0]}
                </h3>
                <p
                  className={`text-xs leading-relaxed ${
                    isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {category.description.substring(0, 60)}...
                </p>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <Icons.check className="w-5 h-5 text-white" />
                  </div>
                )}
              </button>
            );
          })}
          {!showAll && BUSINESS_CATEGORIES.length > 4 && (
            <button
              onClick={() => setShowAll(true)}
              className="p-4 rounded-2xl border-2 border-dashed border-[var(--border-color)] hover:border-[#4ECDC4] transition-colors text-center flex flex-col items-center justify-center"
            >
              <Icons.plus className="w-6 h-6 text-[var(--text-muted)] mb-2" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                +{BUSINESS_CATEGORIES.length - 4} More
              </span>
            </button>
          )}
        </div>
      )}

      {/* Selected Filter Badge */}
      {(selectedServiceType || selectedBusinessCategory) && (
        <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-[rgba(78,205,196,0.1)] border border-[rgba(78,205,196,0.3)]">
          <Icons.filter className="w-4 h-4 text-[#4ECDC4]" />
          <span className="text-sm text-[var(--text-secondary)]">
            Showing prompts for:{' '}
            <span className="font-medium text-[var(--foreground)]">
              {selectedServiceType
                ? SERVICE_TYPES.find(s => s.id === selectedServiceType)?.name
                : BUSINESS_CATEGORIES.find(c => c.id === selectedBusinessCategory)?.name}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

// Quick Access Cards for Homepage
export function QuickAccessCards() {
  const quickLinks = [
    {
      title: 'Hospice Eligibility',
      description: 'Determine patient eligibility for hospice care',
      icon: Icons.hospiceDove,
      color: '#dc2626',
      gradient: 'from-red-600 to-rose-700',
      href: '/builder?service=hospice&category=clinical',
    },
    {
      title: 'SNF Financial Analysis',
      description: 'P&L, PDPM, and reimbursement analysis',
      icon: Icons.financeChart,
      color: '#2563eb',
      gradient: 'from-blue-600 to-blue-800',
      href: '/builder?service=snf&category=finance',
    },
    {
      title: 'Census & Marketing',
      description: 'Occupancy management and lead generation',
      icon: Icons.censusUsers,
      color: '#7c3aed',
      gradient: 'from-violet-600 to-purple-800',
      href: '/builder?category=census',
    },
    {
      title: 'M&A Due Diligence',
      description: 'Valuations and deal analysis for healthcare',
      icon: Icons.maDeal,
      color: '#ca8a04',
      gradient: 'from-yellow-600 to-amber-700',
      href: '/builder?category=ma',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {quickLinks.map((link, index) => {
        const IconComponent = link.icon;
        return (
          <a
            key={index}
            href={link.href}
            className="group p-5 rounded-2xl bg-gradient-to-br opacity-90 hover:opacity-100 transition-all hover:shadow-xl hover:scale-[1.02] text-white"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${link.color}, ${link.color}dd)`,
            }}
          >
            <IconComponent className="w-8 h-8 mb-3 opacity-90" />
            <h3 className="font-semibold mb-1">{link.title}</h3>
            <p className="text-sm opacity-80">{link.description}</p>
          </a>
        );
      })}
    </div>
  );
}

export default ServiceCategoryNav;
