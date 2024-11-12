import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PrescriptionDtoOut } from 'Dto/prescriptions/prescription.dto';
import { getPrescriptionById } from 'service/precription.service'; // Make sure the service path is correct
import PrescriptionInformation from './prescription.information'; // Make sure this import is correct
import TransactionForm from './transaction.redeem'; // Make sure this import is correct

const TransactionPrescriptionForm: React.FC = () => {
  const location = useLocation();
  const { prescriptionId } = location.state || {}; // Assuming prescriptionId comes from the route's state
  const [prescription, setPrescription] = useState<PrescriptionDtoOut | null>(null);

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      if (prescriptionId) {
        try {
          const prescriptionData = await getPrescriptionById(prescriptionId);
          setPrescription(prescriptionData);
        } catch (error) {
          console.error('Error fetching prescription data:', error);
        }
      }
    };
    fetchPrescriptionData();
  }, [prescriptionId]);

  return (
    <div>
      {/* Pass prescriptionId, not the entire prescription object */}
      <PrescriptionInformation prescriptionId={prescriptionId} />
      <TransactionForm />
    </div>
  );
};

export default TransactionPrescriptionForm;
