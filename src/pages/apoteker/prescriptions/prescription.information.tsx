import React, { useEffect, useState } from 'react';
import { PrescriptionDtoOut } from 'Dto/prescriptions/prescription.dto';
import { getPrescriptionById } from 'service/precription.service';

interface PrescriptionInformationProps {
  prescriptionId: number;
}

const PrescriptionInformation: React.FC<PrescriptionInformationProps> = ({ prescriptionId }) => {
  const [prescription, setPrescription] = useState<PrescriptionDtoOut | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        setLoading(true);
        setError(null);

        // Ambil data prescription termasuk doctor dan customer
        const response = await getPrescriptionById(prescriptionId);

        // Cek apakah data prescription ada dalam response
        const data: PrescriptionDtoOut = response.data; // Sesuaikan dengan struktur dari API Anda

        // Logging untuk memastikan data prescription lengkap
        console.log('Fetched Prescription Data:', data);

        // Pastikan data doctor dan customer ada di dalam prescription
        if (!data.doctor) {
          console.error('Doctor data is missing');
          throw new Error('Doctor data is missing');
        }
        if (!data.customer) {
          console.error('Customer data is missing');
          throw new Error('Customer data is missing');
        }

        setPrescription(data);
      } catch (error) {
        setError('Failed to fetch prescription data');
        console.error('Error fetching prescription data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [prescriptionId]);

  if (loading) {
    return <p>Loading prescription data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h4>Prescription Information</h4>
      {prescription ? (
        <div
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            fontSize: '14px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <div>
              <p style={{ margin: 0, color: '#0077B6', fontWeight: 'bold' }}>
                {prescription.prescriptionDate
                  ? new Date(prescription.prescriptionDate).toLocaleString()
                  : 'N/A'}
              </p>
              <p style={{ margin: 0, color: '#0077B6', fontWeight: 'bold' }}>
                Prescription Code: #{prescription.prescriptionCode}
              </p>
            </div>
            <div>
              <span
                style={{
                  padding: '4px 10px',
                  backgroundColor: prescription.isRedeem ? '#D4EDDA' : '#F8D7DA', // Hijau soft untuk redeemed, Merah soft untuk unredeemed
                  color: prescription.isRedeem ? '#155724' : '#721C24', // Teks hijau untuk redeemed, merah untuk unredeemed
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                }}
              >
                {prescription.isRedeem ? 'Redeemed' : 'Unredeemed'}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <p style={{ margin: '2px 0', fontWeight: 'bold' }}>Prescriptions</p>
            <p style={{ margin: 0 }}>{prescription.prescriptions}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <p style={{ margin: '2px 0', fontWeight: 'bold' }}>Patient Name</p>
              <p style={{ margin: '2px 0', fontWeight: 'bold' }}>Age</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '2px 0' }}>{prescription.customer?.name || 'N/A'}</p>
              <p style={{ margin: '2px 0' }}>{prescription.customer?.age || 'N/A'}</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ margin: '2px 0', fontWeight: 'bold' }}>Doctor</p>
            <p style={{ margin: '2px 0', textAlign: 'right' }}>
              {prescription.doctor?.name || 'N/A'}
            </p>
          </div>
        </div>
      ) : (
        <p>No prescription data found.</p>
      )}
    </div>
  );
};

export default PrescriptionInformation;
