import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler, Check } from 'lucide-react';

export const SizeGuideModal = () => {
  const { sizeGuideOpen, setSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState('cm'); // 'cm' | 'in'
  const [activeTab, setActiveTab] = useState('tops'); // 'tops' | 'bottoms' | 'footwear'

  if (!sizeGuideOpen) return null;

  const topsData = [
    { size: 'XS', chest: { cm: '116', in: '45.6' }, length: { cm: '68', in: '26.8' }, shoulder: { cm: '58', in: '22.8' }, sleeve: { cm: '59', in: '23.2' } },
    { size: 'S',  chest: { cm: '122', in: '48.0' }, length: { cm: '70', in: '27.5' }, shoulder: { cm: '60', in: '23.6' }, sleeve: { cm: '60', in: '23.6' } },
    { size: 'M',  chest: { cm: '128', in: '50.4' }, length: { cm: '72', in: '28.3' }, shoulder: { cm: '62', in: '24.4' }, sleeve: { cm: '61', in: '24.0' } },
    { size: 'L',  chest: { cm: '134', in: '52.7' }, length: { cm: '74', in: '29.1' }, shoulder: { cm: '64', in: '25.2' }, sleeve: { cm: '62', in: '24.4' } },
    { size: 'XL', chest: { cm: '140', in: '55.1' }, length: { cm: '76', in: '29.9' }, shoulder: { cm: '66', in: '26.0' }, sleeve: { cm: '63', in: '24.8' } },
    { size: 'XXL', chest: { cm: '146', in: '57.4' }, length: { cm: '78', in: '30.7' }, shoulder: { cm: '68', in: '26.7' }, sleeve: { cm: '64', in: '25.2' } },
  ];

  const bottomsData = [
    { size: '28', waist: { cm: '76', in: '30.0' }, hip: { cm: '106', in: '41.7' }, inseam: { cm: '78', in: '30.7' }, thigh: { cm: '66', in: '26.0' } },
    { size: '30', waist: { cm: '81', in: '32.0' }, hip: { cm: '111', in: '43.7' }, inseam: { cm: '79', in: '31.1' }, thigh: { cm: '69', in: '27.1' } },
    { size: '32', waist: { cm: '86', in: '34.0' }, hip: { cm: '116', in: '45.6' }, inseam: { cm: '80', in: '31.5' }, thigh: { cm: '72', in: '28.3' } },
    { size: '34', waist: { cm: '91', in: '36.0' }, hip: { cm: '121', in: '47.6' }, inseam: { cm: '81', in: '31.9' }, thigh: { cm: '75', in: '29.5' } },
    { size: '36', waist: { cm: '96', in: '38.0' }, hip: { cm: '126', in: '49.6' }, inseam: { cm: '82', in: '32.3' }, thigh: { cm: '78', in: '30.7' } },
  ];

  const footwearData = [
    { eu: '40', us: '7.5', uk: '6.5', footLength: { cm: '25.5', in: '10.0' } },
    { eu: '41', us: '8.5', uk: '7.5', footLength: { cm: '26.2', in: '10.3' } },
    { eu: '42', us: '9.0', uk: '8.0', footLength: { cm: '27.0', in: '10.6' } },
    { eu: '43', us: '10.0', uk: '9.0', footLength: { cm: '27.8', in: '10.9' } },
    { eu: '44', us: '11.0', uk: '10.0', footLength: { cm: '28.5', in: '11.2' } },
    { eu: '45', us: '12.0', uk: '11.0', footLength: { cm: '29.2', in: '11.5' } },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#111111] border border-white/15 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 text-white relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-white/60" />
              <span className="font-mono-tech text-xs tracking-widest uppercase text-white/50">Atelier Sizing Specs</span>
            </div>
            <h3 className="font-display text-xl uppercase tracking-wider mt-1">Silhouette & Measurement Guide</h3>
          </div>
          <button
            onClick={() => setSizeGuideOpen(false)}
            className="p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Unit Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 my-6">
          <div className="flex border border-white/15 p-1 bg-[#181818]">
            <button
              onClick={() => setActiveTab('tops')}
              className={`px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider cursor-pointer transition-colors ${
                activeTab === 'tops' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
            >
              Hoodies & Tops
            </button>
            <button
              onClick={() => setActiveTab('bottoms')}
              className={`px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider cursor-pointer transition-colors ${
                activeTab === 'bottoms' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
            >
              Trousers & Cargos
            </button>
            <button
              onClick={() => setActiveTab('footwear')}
              className={`px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider cursor-pointer transition-colors ${
                activeTab === 'footwear' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
            >
              Footwear
            </button>
          </div>

          <div className="flex border border-white/15 p-1 bg-[#181818]">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider cursor-pointer transition-colors ${
                unit === 'cm' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider cursor-pointer transition-colors ${
                unit === 'in' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
            >
              INCHES
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto border border-white/10 mb-6">
          {activeTab === 'tops' && (
            <table className="w-full text-left font-mono-tech text-xs">
              <thead className="bg-[#181818] border-b border-white/10 text-white/50 uppercase">
                <tr>
                  <th className="p-3">Size</th>
                  <th className="p-3">Chest Width</th>
                  <th className="p-3">Total Length</th>
                  <th className="p-3">Shoulder Drop</th>
                  <th className="p-3">Sleeve Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {topsData.map((row) => (
                  <tr key={row.size} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">{row.size}</td>
                    <td className="p-3 text-white/80">{row.chest[unit]} {unit}</td>
                    <td className="p-3 text-white/80">{row.length[unit]} {unit}</td>
                    <td className="p-3 text-white/80">{row.shoulder[unit]} {unit}</td>
                    <td className="p-3 text-white/80">{row.sleeve[unit]} {unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'bottoms' && (
            <table className="w-full text-left font-mono-tech text-xs">
              <thead className="bg-[#181818] border-b border-white/10 text-white/50 uppercase">
                <tr>
                  <th className="p-3">Waist</th>
                  <th className="p-3">Relaxed Waist</th>
                  <th className="p-3">Hip Circumference</th>
                  <th className="p-3">Inseam</th>
                  <th className="p-3">Thigh Width</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bottomsData.map((row) => (
                  <tr key={row.size} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">{row.size}</td>
                    <td className="p-3 text-white/80">{row.waist[unit]} {unit}</td>
                    <td className="p-3 text-white/80">{row.hip[unit]} {unit}</td>
                    <td className="p-3 text-white/80">{row.inseam[unit]} {unit}</td>
                    <td className="p-3 text-white/80">{row.thigh[unit]} {unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'footwear' && (
            <table className="w-full text-left font-mono-tech text-xs">
              <thead className="bg-[#181818] border-b border-white/10 text-white/50 uppercase">
                <tr>
                  <th className="p-3">EU</th>
                  <th className="p-3">US (Men's)</th>
                  <th className="p-3">UK</th>
                  <th className="p-3">Foot Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {footwearData.map((row) => (
                  <tr key={row.eu} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">EU {row.eu}</td>
                    <td className="p-3 text-white/80">US {row.us}</td>
                    <td className="p-3 text-white/80">UK {row.uk}</td>
                    <td className="p-3 text-white/80">{row.footLength[unit]} {unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Fit Direction Note */}
        <div className="bg-[#181818] p-4 border border-white/10 text-xs text-white/70 space-y-2">
          <p className="font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-white" />
            Silhouette Philosophy
          </p>
          <p>
            VØID pieces feature intentional runway proportions: exaggerated drop-shoulders, wide boxy torsos, and cropped waistbands designed to layer over longline undergarments.
          </p>
          <p className="text-white/50 font-mono-tech">
            Model is 187cm (6'1") wearing size Large hoodie and size 32 trouser.
          </p>
        </div>
      </div>
    </div>
  );
};
