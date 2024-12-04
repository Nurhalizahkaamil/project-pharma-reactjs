import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PrescriptionDtoOut } from 'Dto/prescriptions/prescription.dto';
import { getPrescriptionById } from 'service/precription.service';
import PrescriptionInformation from './prescription.information';
import GenericTransactionForm from '../generic/generic.transaction'; // Menambahkan GenericTransactionForm

const TransactionPrescriptionForm: React.FC = () => {
  const location = useLocation();
  const { prescriptionId } = location.state || {}; // Mengambil prescriptionId dari state
  const [prescription, setPrescription] = useState<PrescriptionDtoOut | null>(null);

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      if (prescriptionId) {
        try {
          const prescriptionData = await getPrescriptionById(prescriptionId);
          setPrescription(prescriptionData); // Menyimpan data resep ke state
        } catch (error) {
          console.error('Error fetching prescription data:', error);
        }
      }
    };
    fetchPrescriptionData();
  }, [prescriptionId]);

  return (
    <div>
      {/* Menampilkan informasi resep */}
      <div style={{ marginBottom: '40px' }}>
        <PrescriptionInformation prescriptionId={prescriptionId} />
      </div>

      {/* Memastikan bahwa transaksi hanya dilakukan jika data resep tersedia */}
      {prescription && (
        <div style={{ marginTop: '60px' }}>
          <GenericTransactionForm />
        </div>
      )}
    </div>
  );
};

export default TransactionPrescriptionForm;
