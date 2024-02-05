import React from 'react'
import FormField from '../FORM/FormFieldInput'

const AdditionalNotes = ({formData, handleInputChange}) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Step 7: Additional Notes</h2>

      {/* Notes field */}
      <div className="w-full">
        <FormField
          label="Notes"
          as="textarea"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={3}
          required
        />
      </div>
    </div>
  )
}

export default AdditionalNotes