import React from 'react';
import { Download } from 'lucide-react';
import { Student } from '../../types/student';
import { format } from 'date-fns';
import { usePDF } from 'react-to-pdf';

interface EjaadaCertificateProps {
  student: Student;
}

export default function EjaadaCertificate({ student }: EjaadaCertificateProps) {
  const { toPDF, targetRef } = usePDF({filename: 'ejaada-certificate.pdf'});
  const issueDate = format(new Date(), 'MMMM d, yyyy');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">شهادة الإجادة الطلابية</h2>
        <button
          onClick={() => toPDF()}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          <span>Download Certificate</span>
        </button>
      </div>

      <div
        ref={targetRef}
        className="bg-white rounded-xl shadow-sm p-12"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* UTAS Logo */}
          <div className="flex justify-between items-start mb-12">
            <img 
              src="/src/pages/public/images/utas-logo.png" 
              alt="UTAS Logo" 
              className="w-48"
            />
          </div>

          {/* Certificate Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#4338ca] mb-2" style={{ fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
              شهادة شكر وتقدير
            </h1>
          </div>

          {/* Certificate Content */}
          <div className="text-center space-y-8" style={{ fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
            <div className="text-xl">
              <p>تشهد جامعة التقنية والعلوم التطبيقية بنزوى بأن</p>
              <p className="text-2xl font-bold mt-4 mb-4">{student.name}</p>
              <p>قد شارك/ت في الأنشطة والفعاليات الطلابية وحقق/ت</p>
              <p className="text-2xl font-bold mt-4 mb-4">{student.totalPoints} نقطة</p>
              <p>في مختلف المجالات والأنشطة الأكاديمية واللاصفية</p>
            </div>

            <div className="mt-16">
              <p className="text-lg">
                الرقم الأكاديمي: {student.studentId}
                <br />
                القسم: {student.department}
                <br />
                تاريخ الإصدار: {issueDate}
              </p>
            </div>

            {/* Signature */}
            <div className="mt-16 flex justify-center">
              <div className="text-center">
                <div className="w-64 border-b-2 border-gray-400 mb-2"></div>
                <p className="text-lg">د. محمد بن راشد بن حمدان المعمري</p>
                <p className="text-sm text-gray-600">مساعد رئيس جامعة التقنية والعلوم التطبيقية بنزوى</p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-500/20 to-blue-500/20 rounded-tl-full"></div>
        </div>
      </div>
    </div>
  );
}