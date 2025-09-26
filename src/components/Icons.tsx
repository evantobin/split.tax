import React from 'react';
import { 
  Trash2, 
  Plus, 
  Calculator, 
  Download, 
  HelpCircle, 
  RotateCcw, 
  Settings, 
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  LogOut,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';

export const TrashIcon: React.FC = () => <Trash2 className="w-4 h-4" />;
export const PlusIcon: React.FC = () => <Plus className="w-4 h-4" />;
export const CalculatorIcon: React.FC = () => <Calculator className="w-4 h-4" />;
export const CloudDownloadIcon: React.FC = () => <Download className="w-4 h-4" />;
export const QuestionIcon: React.FC = () => <HelpCircle className="w-4 h-4" />;
export const RefreshIcon: React.FC = () => <RotateCcw className="w-4 h-4" />;
export const CogIcon: React.FC = () => <Settings className="w-4 h-4" />;
export const CalendarIcon: React.FC = () => <Calendar className="w-4 h-4" />;
export const DollarIcon: React.FC = () => <DollarSign className="w-4 h-4" />;
export const MapPinIcon: React.FC = () => <MapPin className="w-4 h-4" />;
export const FileTextIcon: React.FC = () => <FileText className="w-4 h-4" />;
export const LogOutIcon: React.FC = () => <LogOut className="w-4 h-4" />;
export const ChevronDownIcon: React.FC = () => <ChevronDown className="w-4 h-4" />;
export const ChevronRightIcon: React.FC = () => <ChevronRight className="w-4 h-4" />;
export const MoonIcon: React.FC = () => <Moon className="w-4 h-4" />;
export const SunIcon: React.FC = () => <Sun className="w-4 h-4" />;

export const SplitTaxLogo: React.FC = () => (
    <div className="flex items-center gap-2">
        <svg width="32" height="32" viewBox="0 0 32 32" className="text-slate-700 dark:text-slate-300">
            {/* Background circle */}
            <circle cx="16" cy="16" r="14" fill="currentColor" className="opacity-10"/>
            
            {/* Split symbol - two curved paths */}
            <path 
                d="M8 12 L12 8 L16 12 M16 12 L20 8 L24 12" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            <path 
                d="M8 20 L12 24 L16 20 M16 20 L20 24 L24 20" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            
            {/* Divider line */}
            <line 
                x1="6" y1="16" x2="26" y2="16" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
            />
        </svg>
        
        <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-none">split</span>
            <span className="text-sm text-slate-600 dark:text-slate-400 font-semibold leading-none">.tax</span>
        </div>
    </div>
);
